<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class Permission extends Resource
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
            'cn_name' => $this->cn_name,
            'guard_name' => $this->guard_name,
        ];
    }
}
