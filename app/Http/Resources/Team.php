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
        $cteacher = '';
        if ($this->getCteacher())
        {
            $cteacher = $this->getCteacher()->name;
        }
        return [
            'id' => $this->id,
            'name' => $this->name,
            'kk_charge' => $this->kk_recharge,
            'cteacher' => $cteacher,
        ];
    }

    public function with($request)
    {
        return [
            'data' => [
            ],
        ];
    }
}
