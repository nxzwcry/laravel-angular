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
                $res->push( [
                    'name' => $data->first()->cteacher->name,
                    'team_count' => $data->where('lesson_type', 'bt')->count(),
                    'b_count' => $data->where('lesson_type', 'b')->count(),
                    'zhongjiao_count' => $data->where('lesson_type', '<>', 'b')
                        ->where('lesson_type', '<>', 'bt')
                        ->sum('zhongjiao_cost'),
                    'others' => collect($item)->where('status', '=', 0)->count()+collect($item)->where('status', '=', 2)->count(),
                ]);
            }
        }
        return [
            'data' => $res,
            'links' => [
                'self' => 'link-value',
            ],
        ];
    }
}
