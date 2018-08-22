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
            'student' => $this->student ? $this->student->name : '',
            'date' => $this->start_datetime->toDateString(),
            'time' => $this->start_datetime->format('H:i').'~'.$this->end_datetime->format('H:i'),
            'cteacher' => $this->cteacher ? $this->cteacher->name : '',
            'fteacher' => $this->fteacher ? $this->fteacher->name : '',
            'place' => $this->place ? $this->place->name : '',
            'lesson_type' => lessonType($this->lesson_type),
        ];
    }

}
