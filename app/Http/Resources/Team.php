<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class Team extends Resource
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
            'kk_charge' => $this->kk_recharge,
            'cteacher' => $this->cteacher ? $this->cteacher->name : null,
            'cteacher_user_id' => $this->cteacher_user_id,
            'place' => $this->place ? $this->place->name : null,
            'place_id' => $this->place ? $this->place->id : null,
            'student_count' => $this->students->count(),
            'courses' => Course::collection($this->courses),
        ];
    }

    public function with($request)
    {
        return [
            'data' => [
                'students' => $this->students ? Student::collection($this->students) : null,
                'newlessons' => $this->getNewLessons() ? Lesson::collection($this->getNewLessons()) : null,
                'oldlessons' => $this->getNotNewLessons() ? Lesson::collection($this->getNotNewLessons()) : null,
            ],
        ];
    }
}
