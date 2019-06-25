<?php

namespace App\Http\Controllers\Api;

use App\Lesson;
use App\Student;
use Illuminate\Http\Request;
use App\User;
use App\Http\Resources\User as UserResource;
use App\Http\Resources\UserCollection;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Foundation\Auth\RegistersUsers;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\StudentCollection;
use Carbon\Carbon;
use App\Http\Resources\LessonCollection;

class UserController extends ApiController
{
    use SendsPasswordResetEmails;

    public function index()
    {
        return new UserCollection(User::where('active', true)->get());
    }

    public function show(User $user)
    {
        return new UserResource($user);
    }

    // 创建用户时随机生成密码
    public function store(Request $request)
    {
        $this->validator($request->all())->validate();
        $user = User::create($request->all());
        $user->changeRole($request->all());
        $this->sendResetLinkEmail($request);

        return response()->json(new UserResource($user), 201);
    }

    public function sendResetEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email|max:255|exists:users,email'
        ]);

//        date_default_timezone_set('UTC');
        $this->sendResetLinkEmail($request);
//        date_default_timezone_set('Asia/Shanghai');

        return $this->message("邮件发送成功");
    }

    public function update(Request $request, User $user)
    {
        $user->update($request->all());
        $user->changeRole($request->all());
        return response()->json(new UserResource($user), 200);
    }

    public function delete(User $user)
    {
        $user->deactive();

        return response()->json(null, 204);
    }

    // 获取中教老师列表
    public function getCteachers()
    {
//        $roel = Role::where('name', 'cteacher');
        return new UserCollection(User::role("cteacher")->where('active', true)->get());;
    }

    // 获取顾问列表
    public function getAgents()
    {
//        $roel = Role::where('name', 'agent');
        return new UserCollection(User::role("agent")->where('active', true)->get());;
    }


    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
        ]);
    }

    // 60天内加入的新学生（顾问视图）
    public function newStudentsA()
    {
        $students = null;
        $user = Auth::user();
        $time = Carbon::now('Asia/Shanghai')->subDays(60);
        if ( $user->hasRole('admin') )
        {
            $students = Student::where('created_at', '>=', $time)->get();
        }
        else
        {
            $students = $user->agentStudents()->where('created_at', '>=', $time)->get();
        }
        if ($students)
        {
            $students = $students->sortByDesc(function ($student, $key) {
                return $student->created_at;
            })->flatten();
        }
        return new StudentCollection($students);
    }

    // 60天内加入的新学生（老师视图）
    public function newStudentsT()
    {
        $students = null;
        $user = Auth::user();
        $time = Carbon::now('Asia/Shanghai')->subDays(60);
        $students = $user->teacherStudents()->where('created_at', '>=', $time)->get();
        if ($students)
        {
            $students = $students->sortByDesc(function ($student, $key) {
                return $student->created_at;
            })->flatten();
        }
        return new StudentCollection($students);
    }

    // 续费周期学生（顾问视图）
    public function xufeiStudentsA()
    {
        $students = null;
        $user = Auth::user();
        if ( $user->hasRole('admin') )
        {
            $students = Student::whereIn('status', [0, 1])->get();
        }
        else
        {
            $students = $user->agentStudents()->whereIn('status', [0, 1])->get();
        }
        if ($students)
        {
            $res =  $students->filter(function ($value, $key){
                $times = $value->getTimes();
                return $times <= 10;
            });
            if ($res->isNotEmpty())
            {
                $res = $res->sortBy(function ($student, $key) {
                    return $student->getTimes();
                })->flatten();
            }
        }
        return new StudentCollection($res);
    }

    // 续费周期学生（老师视图）
    public function xufeiStudentsT()
    {
        $students = null;
        $user = Auth::user();
        $students = $user->teacherStudents()->whereIn('status', [0, 1])->get();
        if ($students)
        {
            $res =  $students->filter(function ($value, $key){
                $times = $value->getTimes();
                return $times <= 10;
            });
            if ($res->isNotEmpty())
            {
                $res = $res->sortBy(function ($student, $key) {
                    return $student->getTimes();
                })->flatten();
            }
        }
        return new StudentCollection($res);
    }

    // 未排课学员list
    public function noLessons()
    {
        $students = null;
        $user = Auth::user();
        if ( !$user->hasRole('admin') )
        {
            $students = $user->agentStudents()->where('status', 2)->get();
        }
        if ($students)
        {
            $students = $students->sortByDesc(function ($student, $key) {
                return $student->getStopTime();
            })->flatten();
        }
        return new StudentCollection($students);
    }

    public function today()
    {
        $user = Auth::user();
        $lessons = Lesson::getNewLessons(0)->where('cteacher_id', $user->id);
        return new LessonCollection($lessons);
    }

}
