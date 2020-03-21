<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Permission as PermissionResource;

class User extends JsonResource
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
            'agentCount' => $this->getAgentCount(),
            'teacheCount' => $this->getTeacheCount(),
            'permissions' => PermissionResource::collection($this->getAllPermissions()),
        ];
    }

}
