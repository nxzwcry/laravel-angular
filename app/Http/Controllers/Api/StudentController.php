<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\Recharge as RechargeResource;
use App\Phone;
use Illuminate\Http\Request;
use App\Student;
use App\Http\Resources\Student as StudentResource;
use App\Http\Resources\StudentCollection;
use Carbon\Carbon;

class StudentController extends ApiController
{
    // 根据传来的类型，获取该类型的学生名单
    public function index(String $type=null)
    {
        $students = null;
        if (!$type)
        {
            $students = Student::where('status', '>=', 0)->get();
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
        elseif ($type == 'new-stoped')
        {
            $time = Carbon::now('Asia/Shanghai')->subDays(60);
            $students = Student::where('status', -2)->where('stop_time', '>=', $time)->get();
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
        $phones = $request->phones;
        $request->offsetUnset('phones');

        $student = Student::create($request->all());

        // 处理电话信息
        Phone::deal($phones, $student->id);

        return new StudentResource($student);
    }

    public function update(Request $request, Student $student)
    {
        $phones = $request->phones;
        $request->offsetUnset('phones');
        $student->update($request->all());
        // 处理电话信息
        Phone::deal($phones, $student->id);

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
