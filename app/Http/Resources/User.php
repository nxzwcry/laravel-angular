<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;
use App\Http\Resources\Permission as PermissionResource;

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
            'email' => $this->email,
            'role' => $this->roles->first() ? $this->roles->first()->cn_name : '',
            'role_id' => $this->roles->first() ? $this->roles->first()->id : '',
            'agentCount' => count($this->agentStudents),
            'teacheCount' => count($this->teacherStudents),
            'permissions' => PermissionResource::collection($this->getAllPermissions()),
        ];
    }

}
