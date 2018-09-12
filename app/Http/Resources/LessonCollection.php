<?php

namespace App\Http\Resources;
use Carbon\Carbon;

use Illuminate\Http\Resources\Json\ResourceCollection;

class LessonCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $data = collect();
        $lessons = collect();
        $date = $this->collection->first()->start_datetime->setTimezone('Asia/Shanghai')->toDateString();
        foreach ($this->collection as $item)
        {
            $temp = $item->start_datetime->setTimezone('Asia/Shanghai')->toDateString();
            if ($date <> $temp)
            {
                $data->push([
                    'date' => $date,
                    'lessons' => $lessons,
                ]);
                $date = $temp;
                $lessons = collect([$item]);
            }
            else
            {
                $lessons->push($item);
            }
        }
        return [
            'data' => $data,
            'links' => [
                'self' => 'link-value',
            ],
        ];
    }
}
