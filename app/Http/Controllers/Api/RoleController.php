<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Http\Resources\Role as RoleResource;

class RoleController extends ApiController
{
    public function index()
    {
        return RoleResource::collection(Role::all());
    }

    public function show(Role $role)
    {
        return new RoleResource($role);
    }

    public function store(Request $request)
    {
        $role = Role::create($request->all());

        return new RoleResource($role);
    }

    public function update(Request $request, Role $role)
    {
        $role->update($request->all());

        return new RoleResource($role);
    }

    public function delete(Role $role)
    {
        $role->delete();

        return response()->json(null, 204);
    }

    public function addPermissions(Request $request, Role $role)
    {
        $permissions = Permission::find($request->all());
        $role->givePermissionTo($permissions);
        return new RoleResource($role);
    }

    public function removePermissions(Request $request, Role $role)
    {
        $permissions = Permission::find($request->all());
        foreach ($permissions as $permission){
            $role->revokePermissionTo($permission);
        }
        return new RoleResource($role);
    }
}
