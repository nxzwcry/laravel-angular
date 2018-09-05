<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\Recharge as RechargeResource;
use Illuminate\Http\Request;
use App\Student;
use App\Http\Resources\Student as StudentResource;
use App\Http\Resources\StudentCollection;
use Carbon\Carbon;

class StudentController extends ApiController
{
    public function index()
    {
        return new StudentCollection(Student::all());
    }

    public function show(Student $student)
    {
        return new StudentResource($student);
    }

    public function store(Request $request)
    {
        $student = Student::create($request->all());

        return response()->json(new StudentResource($student), 201);
    }

    public function update(Request $request, Student $student)
    {
        $student->update($request->all());

        return response()->json(new StudentResource($student), 200);
    }

    public function delete(Student $student)
    {
        $student->delete();

        return response()->json(null, 204);
    }
}
