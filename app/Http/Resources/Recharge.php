<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class Recharge extends Resource
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
            'waijiao' => $this->waijiao,
            'jingpin' => $this->jingpin,
            'zhongjiao' => $this->zhongjiao,
            'money' => $this->money,
            'user_id' => $this->user_id,
            'user' => $this->user ? $this->user->name : '',
            'student_id' => $this->student_id,
            'student' => $this->student ? $this->student->name : '',
            'time' => $this->created_at->toDateString(),
            'note' => $this->note,
        ];
    }

}
