<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\Recharge as RechargeResource;
use Illuminate\Http\Request;
use App\Recharge;
use App\Student;

class RechargeController extends ApiController
{
    public function index()
    {
        return RechargeResource::collection(Recharge::all());
    }

    public function list(Student $student)
    {
        return RechargeResource::collection($student->recharges);
    }

    public function store(Request $request)
    {
        $recharge = Recharge::create($request->all());

        return response()->json(new RechargeResource($recharge), 201);
    }

    public function update(Request $request, Recharge $recharge)
    {
        $recharge->update($request->all());

        return response()->json(new RechargeResource($recharge), 200);
    }

    public function delete(Recharge $recharge)
    {
        $recharge->delete();

        return response()->json(null, 204);
    }
}
