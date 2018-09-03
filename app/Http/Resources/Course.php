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
            'dow' => $this->dow,
            'stime' => $this->start_time->timestamp,
            'etime' => $this->end_time->timestamp,
            'ftime' => $this->fteacher_time ? $this->fteacher_time->timestamp : null,
            'cteacher' => $this->cteacher ? $this->cteacher->name : null,
            'fteacher' => $this->fteacher ? $this->fteacher->name : null,
            'place' => $this->place ? $this->place->name : null,
            'lesson_type' => lessonType($this->lesson_type),
        ];
    }

}
