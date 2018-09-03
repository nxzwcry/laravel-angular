<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class Course extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'date' => numToWeek($this->dow),
            'date_id' => $this->dow,
//            'time' => '时间',
            'stime' => substr($this->start_time, 0, 5),
            'etime' => substr($this->end_time, 0, 5),
            'cteacher' => $this->cteacher ? $this->cteacher->name : '',
            'fteacher' => $this->fteacher ? $this->fteacher->name : '',
            'place' => $this->place ? $this->place->name : '',
            'lesson_type' => lessonType($this->lesson_type),
        ];
    }

}
