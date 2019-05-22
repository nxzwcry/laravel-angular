<?php

namespace App\Http\Controllers\Api;

use App\Recharge;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Lesson;
use App\Student;
use App\Http\Resources\TeacherLessonsCount as CountResource;

// 课程统计数据Controller
class CountController extends ApiController
{
    // 统计课时动作
    public function getCount(Request $request)
    {
        // 输入信息：stime，etime，cteacher_id（可选）
        if ($request->stime && $request->etime)
        {
            $stime = Carbon::createFromTimeStamp($request->stime,'Asia/Shanghai');
            $etime = Carbon::createFromTimeStamp($request->etime,'Asia/Shanghai');
            // 获取从stime到etime之间所有供统计使用的课程
            $data = Lesson::getCountList($stime, $etime)->where('cteacher_id', '<>', null)->where('zhongjiao_cost', '>', 0);

            // 如果传入的cteacher_id参数，表示只获取该教师的统计数据
            if ($request->cteacher_id)
            {
                $data = $data->where('cteacher_id', $request->cteacher_id);
            }
            return new CountResource($data);
        }
    }

    // 年度统计动作
    public function getYearCount(Request $request)
    {
        // 输入信息：year
        if ($request->year)
        {
            $stime = Carbon::create($request->year, 1,1,0,0,0,'Asia/Shanghai');
            $etime = Carbon::create($request->year, 12,31,23,59,59,'Asia/Shanghai');

            $oldLessonCount = Lesson::getCount(0, $stime);
            $oldRechargesCount = Recharge::getCount(0, $stime);

            $newCost = Lesson::getCount($stime, $etime);
            $new = Recharge::getCount($stime, $etime);

            // 获取1对1学员剩余课时数
            $one_to_one = $this->getStudentsLeft(1, $etime);
            // 获取班课学员剩余课时数
            $banke = $this->getStudentsLeft(0, $etime);
            // 获取停课学员剩余课时数
            $tingke = $this->getStudentsLeft(2, $etime);
            // 获取不续费学员剩余课时数
            $stoped = $this->getStudentsLeft(-2, $etime);

            $old = [
                'zhongjiao' => $oldRechargesCount['zhongjiao'] - $oldLessonCount['banke']['zhongjiao'] - $oldLessonCount['one_to_one']['zhongjiao'],
                'waijiao' =>  $oldRechargesCount['waijiao'] - $oldLessonCount['banke']['waijiao'] - $oldLessonCount['one_to_one']['waijiao'],
            ];

            $res = collect();
            $res->push([
                'old' => $old,
                'new' => $new,
                'newCost' => $newCost,
                'left' => [
                    'one_to_one' => $one_to_one,
                    'banke' => $banke,
                    'tingke' => $tingke,
                    'stoped' => $stoped,
                    'total' => [
                        'zhongjiao' => $one_to_one['zhongjiao'] + $banke['zhongjiao'] + $tingke['zhongjiao'] + $stoped['zhongjiao'],
                        'waijiao' => $one_to_one['waijiao'] + $banke['waijiao'] + $tingke['waijiao'] + $stoped['waijiao'],
                    ],
                ],
            ]);

            return [
                'data' => $res,
            ];
        }
    }

    // 获取一类学生的剩余课时总数
    public function getStudentsLeft($type, Carbon $etime)
    {
        $zhongjiao = 0;
        $waijiao = 0;
        foreach (Student::where('status', $type)->cursor() as $student)
        {
            $zhongjiao += $student->getLeftZhongjiao($etime);
            $waijiao += $student->getLeftWaijiao($etime);
        }
        return [
            'waijiao' => $waijiao,
            'zhongjiao' => $zhongjiao,
        ];
    }

    // 获取全部学生的剩余课时总数
    public function getAllStudentsLeft(Carbon $etime)
    {
        $zhongjiao = 0;
        $waijiao = 0;
        $students = Student::all();
        foreach ($students as $student)
        {
            $zhongjiao += $student->getLeftZhongjiao($etime);
            $waijiao += $student->getLeftWaijiao($etime);
        }
        return [
            'waijiao' => $waijiao,
            'zhongjiao' => $zhongjiao,
        ];
    }
}
