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
        $names = [];
        $ids = [];
        foreach ($this->roles as $item)
        {
            $names[] = $item->cn_name;
            $ids[] = $item->id;
        }

        return [
            'id' => $this->id,
            'name' => $this->name,
            'ename' => $this->ename,
            'mid' => $this->mid,
            'email' => $this->email,
            'role' => $names,
            'role_id' => $ids,
            'agentCount' => count($this->agentStudents->where('status', '>=', 0)->where('status', '<', 2)), // 只有一对一和班课的正常学生才计算人数
            'teacheCount' => count($this->teacherStudents->where('status', '>=', 0)->where('status', '<', 2)), // 只有一对一和班课的正常学生才计算人数
            'permissions' => PermissionResource::collection($this->getAllPermissions()),
        ];
    }

}
