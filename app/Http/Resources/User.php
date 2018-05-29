<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class User extends Resource
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
            'ename' => $this->ename,
        ];
    }

//    public function with($request)
//    {
//        return [
//            'data' => [
//                'sex' => $this->sex,
//                'grade' => $this->grade,
//                'birthday' => $this->birthday,
//                'email' => $this->email,
//                'ename' => $this->ename,
//                'address' => $this->address,
//                'desc' => $this->desc,
//            ],
//        ];
//    }
}
