<?php

namespace App\Http\Resources;
use Carbon\Carbon;

use Illuminate\Http\Resources\Json\ResourceCollection;

class CourseCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'data' => [
                [
                    'date' => '星期一',
                    'courses' => $this->collection->where('dow', 'MONDAY')->sortBy(function ($course, $key)
                    {
                        return $course->start_time->setTimezone('Asia/Shanghai')->toTimeString();
                    })->flatten(),
                ],
                [
                    'date' => '星期二',
                    'courses' => $this->collection->where('dow', 'TUESDAY')->sortBy(function ($course, $key)
                    {
                        return $course->start_time->setTimezone('Asia/Shanghai')->toTimeString();
                    })->flatten(),
                ],
                [
                    'date' => '星期三',
                    'courses' => $this->collection->where('dow', 'WEDNESDAY')->sortBy(function ($course, $key)
                    {
                        return $course->start_time->setTimezone('Asia/Shanghai')->toTimeString();
                    })->flatten(),
                ],
                [
                    'date' => '星期四',
                    'courses' => $this->collection->where('dow', 'THURSDAY')->sortBy(function ($course, $key)
                    {
                        return $course->start_time->setTimezone('Asia/Shanghai')->toTimeString();
                    })->flatten(),
                ],
                [
                    'date' => '星期五',
                    'courses' => $this->collection->where('dow', 'FRIDAY')->sortBy(function ($course, $key)
                    {
                        return $course->start_time->setTimezone('Asia/Shanghai')->toTimeString();
                    })->flatten(),
                ],
                [
                    'date' => '星期六',
                    'courses' => $this->collection->where('dow', 'SATURDAY')->sortBy(function ($course, $key)
                    {
                        return $course->start_time->setTimezone('Asia/Shanghai')->toTimeString();
                    })->flatten(),
                ],
                [
                    'date' => '星期日',
                    'courses' => $this->collection->where('dow', 'SUNDAY')->sortBy(function ($course, $key)
                    {
                        return $course->start_time->setTimezone('Asia/Shanghai')->toTimeString();
                    })->flatten(),
                ],
            ],
            'links' => [
                'self' => 'link-value',
            ],
        ];
    }

    public function sort($course, $key)
    {
        return $course->start_time->setTimezone('Asia/Shanghai')->toTimeString();
    }
}
