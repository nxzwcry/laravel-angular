<?php

namespace App\Http\Resources;
use Carbon\Carbon;

use Illuminate\Http\Resources\Json\Resource;

class Lesson extends Resource
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
            'student_id' => $this->student_id,
            'student' => $this->student ? $this->student->name : null,
            'student_ename' => $this->student ? $this->student->ename : null,
            'team_id' => $this->team_id,
            'team' => $this->team ? $this->team->name : null,
            'date' => $this->start_datetime->timestamp,
            'stime' => $this->start_datetime->timestamp,
            'etime' => $this->end_datetime->timestamp,
            'fteacher_time' => $this->fteacher_datetime ? $this->fteacher_datetime->timestamp : null,
            'cteacher' => $this->cteacher ? $this->cteacher->ename . '('. $this->cteacher->name . ')' : null,
            'cteacher_id' => $this->cteacher ? $this->cteacher->id : null,
            'cteacher_mid' => $this->cteacher ? $this->cteacher->mid : null,
            'fteacher' => $this->fteacher ? $this->fteacher->name : null,
            'fteacher_id' => $this->fteacher ? $this->fteacher->id : null,
            'mid' => $this->fteacher ? $this->fteacher->mid : null,
            'place' => $this->place ? $this->place->name : null,
            'place_id' => $this->place ? $this->place->id : null,
            'lesson_type' => lessonType($this->lesson_type),
            'lesson_type_id' => $this->lesson_type,
            'jingpin_cost' =>$this->jingpin_cost,
            'waijiao_cost' =>$this->waijiao_cost,
            'zhongjiao_cost' =>$this->zhongjiao_cost,
            'status' => $this->status,
            'sub_lessons' => $this->getSubLessons() ? Lesson::collection($this->getSubLessons()) : null,
            'score' => $this->score,
            'note' => $this->note,
        ];
    }

}
