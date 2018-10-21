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
            'student' => $this->student ? $this->student->name : null,
            'student_id' => $this->student_id,
            'team' => $this->team ? $this->team->name : null,
            'team_id' => $this->team_id,
            'name' => $this->name,
            'dow' => $this->dow,
            'stime' => $this->start_time->timestamp,
            'etime' => $this->end_time->timestamp,
            'ftime' => $this->fteacher_time ? $this->fteacher_time->timestamp : null,
            'cteacher' => $this->cteacher ? $this->cteacher->ename . '('. $this->cteacher->name . ')' : null,
            'cteacher_id' => $this->cteacher ? $this->cteacher->id : null,
            'fteacher' => $this->fteacher ? $this->fteacher->name : null,
            'fteacher_id' => $this->fteacher ? $this->fteacher->id : null,
            'fteacher_time' => $this->fteacher_time ? $this->fteacher_time->timestamp : null,
            'mid' => $this->fteacher ? $this->fteacher->mid : null,
            'place' => $this->place ? $this->place->name : null,
            'place_id' => $this->place ? $this->place->id : null,
            'lesson_type' => lessonType($this->lesson_type),
            'lesson_type_id' => $this->lesson_type,
            'waijiao_cost' => $this->waijiao_cost,
            'zhongjiao_cost' => $this->zhongjiao_cost,
            'jingpin_cost' => $this->jingpin_cost,
        ];
    }

}
