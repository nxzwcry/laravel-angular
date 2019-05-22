<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

// 课程统计数据的资源类
class TeacherLessonsCount extends ResourceCollection
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $res = collect();
        $group = $this->collection->groupBy('cteacher_id');
        foreach ($group as $item)
        {
            // 筛选正常完成的课程进行统计
            $data = collect($item)->where('status', 1);
            if ($data->first())
            {
                // 班课列表
                $b_list = collect();
                $temp = $data->where('lesson_type', 'b')->groupBy('syn_code')->sortBy(
                    function ($item, $key)
                    {
                        // 排序的第一关键字为班级id，第二关键字为开始时间
                        return $item->first()->team_id . $item->first()->start_datetime->timestamp;
                    });
                // 生成班课列表
                foreach ($temp as $team_lesson)
                {
                    // 生成班课上课的学生列表
                    $student_list = collect();
                    foreach ($team_lesson as $student_lesson)
                    {
                        $student_list->push($student_lesson->student->name);
                    }

                    // 向班课列表中添加统计好的班课数据
                    $b_list->push([
                        'stime' => $team_lesson->first()->start_datetime->timestamp,
                        'student_list' => $student_list,
                        'team_name' => $team_lesson->first()->team ? $team_lesson->first()->team->name : null,
                        'count' => $student_list->count(),
                    ]);
                }

                // 班课人次
                $b_count = $data->where('lesson_type', 'b')->count();

                // 补课人次
                $bu_count = $data->where('lesson_type', 'bu')->count();

                // 中教课时数
                $zhongjiao_count = $data->where('lesson_type', '<>', 'b')
                    ->where('lesson_type', '<>', 'bt')
                    ->where('lesson_type', '<>', 'bu')
                    ->sum('zhongjiao_cost');

                // 生成数据
                $res->push( [
                    // 老师姓名
                    'name' => $data->first()->cteacher->name,
                    // 班课课次
                    'team_count' => $data->where('lesson_type', 'bt')->count(),
                    // 班课人次
                    'b_count' => $b_count,
                    // 班课列表
                    'banke' => $b_list,
                    // 补课人次
                    'bu_count' => $bu_count,
                    // 补课列表
                    'buke' => Lesson::collection($data->where('lesson_type', 'bu')->sortBy('start_datetime'))->flatten(),
                    // 中教课时
                    'zhongjiao_count' => $zhongjiao_count,
                    // 中教课列表
                    'zhongjiao' => Lesson::collection($data->where('lesson_type', '<>', 'b')
                        ->where('lesson_type', '<>', 'bt')
                        ->where('lesson_type', '<>', 'bu')->sortBy('start_datetime'))->flatten(),
                    // 其他课程（未上课程+待确认课程）
                    'others_count' => collect($item)
                            ->where('status', '=', 0)
                            ->count()
                        + collect($item)
                            ->where('status', '=', 2)
                            ->count(),
                    // 其他课程列表
                    'others' => Lesson::collection(collect($item)
                        ->where('status', '=', 0)
                        ->concat(
                            collect($item)
                            ->where('status', '=', 2)
                        )
                        ->sortBy('start_datetime'))
                        ->flatten(),
                    // 教师总计
                    'count' => $b_count+$bu_count+$zhongjiao_count,
                ]);
            }
        }
        return [
            'data' => $res,
            // 列总计
            'count' => [
                'team_count' => $res->sum('team_count'),
                'b_count' => $res->sum('b_count'),
                'bu_count' => $res->sum('bu_count'),
                'zhongjiao_count' => $res->sum('zhongjiao_count'),
                'others_count' => $res->sum('others_count'),
                'count' => $res->sum('count'),
            ],
            'links' => [
                'self' => 'link-value',
            ],
        ];
    }
}
