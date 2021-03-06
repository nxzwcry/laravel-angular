<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Recharge extends JsonResource
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
            'time' => $this->created_at->timestamp,
            'note' => $this->note,
        ];
    }

}
