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

    public function show(Request $request)
    {
        $role = Role::find($request->id);
        return new RoleResource($role);
    }

    public function store(Request $request)
    {
        $role = Role::create($request->all());

        return response()->json(new RoleResource($role), 201);
    }

    public function update(Request $request, String $id)
    {
        $role = Role::find($id);
        $role->update($request->all());

        return response()->json(new RoleResource($role), 200);
    }

    public function delete(Request $request)
    {
        $role = Role::find($request->id);

        return response()->json(null, 204);
    }

    public function addPermissions(Request $request, String $id)
    {
        $role = Role::find($id);
        $permissions = Permission::find($request->all());
        return $role->givePermissionTo($permissions);
    }

    public function removePermissions(Request $request, String $id)
    {
        $role = Role::find($id);
        $permissions = Permission::find($request->all());
        foreach ($permissions as $permission){
            $role->revokePermissionTo($permission);
        }
    }
}
