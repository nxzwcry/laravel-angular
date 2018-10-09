<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

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
            $data = collect($item)->where('status', 1);
            if ($data->first())
            {
                $b_list = collect();
                $temp = $data->where('lesson_type', 'b')->groupBy('syn_code')->sortBy(function ($item, $key)
                {
                    return $item->first()->team_id . $item->first()->start_datetime->timestamp;
                });
                foreach ($temp as $team_lesson)
                {
                    $student_list = collect();
                    foreach ($team_lesson as $student_lesson)
                    {
                        $student_list->push($student_lesson->student->name);
                    }
                    $b_list->push([
                        'stime' => $team_lesson->first()->start_datetime->timestamp,
                        'student_list' => $student_list,
                        'team_name' => $team_lesson->first()->team->name,
                        'count' => $student_list->count(),
                    ]);
                }
                $b_count = $data->where('lesson_type', 'b')->count();
                $bu_count = $data->where('lesson_type', 'bu')->count();
                $zhongjiao_count = $data->where('lesson_type', '<>', 'b')
                    ->where('lesson_type', '<>', 'bt')
                    ->where('lesson_type', '<>', 'bu')
                    ->sum('zhongjiao_cost');
                $res->push( [
                    'name' => $data->first()->cteacher->name,
                    'team_count' => $data->where('lesson_type', 'bt')->count(),
                    'b_count' => $b_count,
                    'banke' => $b_list,
                    'bu_count' => $bu_count,
                    'buke' => Lesson::collection($data->where('lesson_type', 'bu')->sortBy('start_datetime'))->flatten(),
                    'zhongjiao_count' => $zhongjiao_count,
                    'zhongjiao' => Lesson::collection($data->where('lesson_type', '<>', 'b')
                        ->where('lesson_type', '<>', 'bt')
                        ->where('lesson_type', '<>', 'bu')->sortBy('start_datetime'))->flatten(),
                    'others_count' => collect($item)->where('status', '=', 0)->count()+collect($item)->where('status', '=', 2)->count(),
                    'others' => Lesson::collection(collect($item)->where('status', '=', 0)->concat(collect($item)->where('status', '=', 2))->sortBy('start_datetime'))->flatten(),
                    'count' => $b_count+$bu_count+$zhongjiao_count,
                ]);
            }
        }
        return [
            'data' => $res,
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
