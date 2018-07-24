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
            'time' => '时间',
//            'time' => $this->start_datetime->format('h:i').'~'.$this->end_datetime->format('h:i'),
            'cteacher' => $this->cteacher ? $this->cteacher->name : '',
            'fteacher' => $this->fteacher ? $this->fteacher->name : '',
            'place' => $this->place ? $this->place->name : '',
            'lesson_type' => $this->lesson_type,
        ];
    }

}
