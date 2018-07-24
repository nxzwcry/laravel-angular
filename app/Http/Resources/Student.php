<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class Student extends Resource
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
            'waijiao' => $this->getLeftWaijiao(),
            'cteacher' => $this->cteacher ? $this->cteacher->name : '',
            'fteacher' => $this->fteacher() ? $this->fteacher()->name : '',
            'agent' => $this->agent ? $this->agent->name : '',
        ];
    }

    public function with($request)
    {
        return [
            'data' => [
                'sex' => $this->sex == 1 ? '男' : ( $this->sex == 2 ? '女' : '性别未知'),
                'grade' => $this->grade < 6 ? '学龄前' : ($this->grade-5).'年级',
                'age' => "{$this->getAge()}岁",
                'email' => $this->email,
                'address' => $this->address,
                'desc' => $this->desc,
                'lessonstage' => 'Phonics',
                'waijiaototal' => $this->getWaijiao(),
                'zhongjiaototal' => $this->getZhongjiao(),
                'jingpintotal' => $this->getJingpin(),
                'waijiaocost' => $this->getWaijiaoCost(),
                'zhongjiaocost' => $this->getZhongjiaoCost(),
                'jingpincost' => $this->getJingpinCost(),
                'score' => 0,
                'phones' => Phone::collection($this->phones),
                'newlessons' => Lesson::collection($this->getNewLessons()),
                'oldlessons' => Lesson::collection($this->getNotNewLessons()),
                'courses' => Course::collection($this->courses),
            ],
        ];
    }
}
