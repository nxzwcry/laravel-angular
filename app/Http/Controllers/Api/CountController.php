<?php

namespace App\Http\Controllers\Api;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Lesson;
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
}
