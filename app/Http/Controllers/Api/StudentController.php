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
    public function index(String $type=null)
    {
        $students = null;
        if (!$type)
        {
            $students = Student::all();
        }
        elseif ($type == 'one-to-one')
        {
            $students = Student::where('status', 1)->get();
        }
        elseif ($type == 'team')
        {
            $students = Student::where('status', 0)->get();
        }
        elseif ($type == 'no-lessons')
        {
            $students = Student::where('status', 2)->get();
        }
        elseif ($type == 'stoped')
        {
            $students = Student::where('status', -2)->get();
        }
        elseif ($type == 'demo')
        {
            $students = Student::where('status', -1)->get();
        }
        if ($students)
        {
            return new StudentCollection($students);
        }
        else
        {
            return response()->json();
        }
    }

    public function show(Student $student)
    {
        return new StudentResource($student);
    }

    public function store(Request $request)
    {
        $student = Student::create($request->all());

        return new StudentResource($student);
    }

    public function update(Request $request, Student $student)
    {
        $student->update($request->all());

        return new StudentResource($student);
    }

    public function stop(Request $request, Student $student)
    {
        return new StudentResource($student->stop());
    }

    public function delete(Student $student)
    {
        $student->delete();

        return response()->json(null, 204);
    }
}
