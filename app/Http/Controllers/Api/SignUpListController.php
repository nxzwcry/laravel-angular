<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\Recharge as RechargeResource;
use App\SignUp;
use Illuminate\Http\Request;
use App\Http\Resources\Student as StudentResource;
use App\Http\Resources\StudentCollection;
use Carbon\Carbon;
use phpDocumentor\Reflection\DocBlock\Tags\Since;

class SignUpListController extends ApiController
{
    // 获取新增名单
    public function index()
    {

    }

//    // 获取所有名单
//    public function all()
//    {
//
//    }
//
//    public function show(SignUp $su)
//    {
//    }

    // 添加线索信息
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|max:8',
            'tel' => 'required|max:16',
            'ip' => 'required',
        ]);

        $res = SignUp::where('ip', $request->ip)
            ->where('created_at', '>', Carbon::today())
            ->get();

        if ($res->first())
        {
            if ($res->where('tel', $request->tel)->first())
            {
                return $this->message('已提交成功，请耐心等待课程顾问联系！');
            }
            if ($res->count() > 3 )
            {
                return $this->message('今日提交次数已达上限，请明日再试。');
            }
        }

        SignUp::create($request->all());

        return $this->message('提交成功，请耐心等待课程顾问联系！');
    }

//    public function update(Request $request, Student $student)
//    {
//        $student->update($request->all());
//
//        return new StudentResource($student);
//    }
//
//    public function stop(Request $request, Student $student)
//    {
//        return new StudentResource($student->stop());
//    }
//
//    public function delete(Student $student)
//    {
//        $student->delete();
//
//        return response()->json(null, 204);
//    }
}
