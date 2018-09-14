<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Carbon\Carbon;
use Spatie\Permission\Models\Permission;
use App\Http\Resources\Permission as PermissionResource;

class PermissionController extends ApiController
{
    public function index()
    {
        return PermissionResource::collection(Permission::all());
    }

    public function show(Permission $permission)
    {
        return new PermissionResource($permission);
    }

    public function store(Request $request)
    {
        $permission = Permission::create($request->all());

        return new PermissionResource($permission);
    }

    public function update(Request $request, Permission $permission)
    {
        $permission->update($request->all());

        return new PermissionResource($permission);
    }

    public function delete(Permission $permission)
    {
        $permission->delete();

        return response()->json(null, 204);
    }
}
