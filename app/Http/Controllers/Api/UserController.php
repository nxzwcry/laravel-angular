<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\User;
use App\Http\Resources\User as UserResource;
use App\Http\Resources\UserCollection;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Foundation\Auth\RegistersUsers;
use Spatie\Permission\Models\Role;

class UserController extends ApiController
{
    use SendsPasswordResetEmails;

    public function index()
    {
        return new UserCollection(User::all());;
    }

    public function show(User $user)
    {
        return new UserResource($user);
    }

    // 创建用户时没有密码
    public function store(Request $request)
    {
        $this->validator($request->all())->validate();
        $user = User::create($request->all());

        $this->sendResetLinkEmail($request);

        return response()->json($user, 201);
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
        return response()->json($user, 200);
    }

    public function delete(User $user)
    {
        $user->delete();

        return response()->json(null, 204);
    }

    public function getCteachers()
    {
//        $roel = Role::where('name', 'cteacher');
        return new UserCollection(User::role("cteacher")->get());;
    }

    public function getAgents()
    {
//        $roel = Role::where('name', 'agent');
        return new UserCollection(User::role("agent")->get());;
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

}