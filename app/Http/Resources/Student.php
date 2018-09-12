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
            'zhongjiao' => $this->getLeftZhongjiao(),
            'jingpin' => $this->getLeftJingpin(),
            'cteacher' => $this->cteacher ? $this->cteacher->name : '',
            'fteacher' => $this->fteacher() ? $this->fteacher()->name : '',
            'cteacher_user_id'=> $this->cteacher_user_id,
            'agent_user_id'=> $this->agent_user_id,
            'agent' => $this->agent ? $this->agent->name : '',
            'team' => $this->team ? $this->team->name : null,
        ];
    }

    public function with($request)
    {
        return [
            'data' => [
                'sex' => $this->sex,
                'grade' => $this->grade,
                'age' => $this->getAge(),
                'birthday' => $this->birthday ? $this->birthday->timestamp : null,
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
                'score' => $this->getScore(),
                'phones' => Phone::collection($this->phones),
                'newlessons' => $this->getNewLessons() ? Lesson::collection($this->getNewLessons()) : null,
                'oldlessons' => $this->getNotNewLessons() ? Lesson::collection($this->getNotNewLessons()) : null,
                'courses' => Course::collection($this->courses),
                'recharges' => Recharge::collection($this->recharges),
                'team_id' => $this->team ? $this->team->id : null,
            ],
        ];
    }
}
