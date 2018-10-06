<?php

namespace App\Http\Controllers\Api;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Lesson;
use App\Http\Resources\TeacherLessonsCount as CountResource;

class CountController extends ApiController
{
    public function getCount(Request $request)
    {
        if ($request->stime && $request->etime)
        {
            $stime = Carbon::createFromTimeStamp($request->stime,'Asia/Shanghai');
            $etime = Carbon::createFromTimeStamp($request->etime,'Asia/Shanghai');
            $data = Lesson::getCountList($stime, $etime)->where('cteacher_id', '<>', null);
            if ($request->cteacher_id)
            {
                $data = $data->where('cteacher_id', $request->cteacher_id);
            }
            return new CountResource($data);
        }
    }
}
