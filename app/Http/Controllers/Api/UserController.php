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

    public function store(Request $request)
    {
        $this->validator($request->all())->validate();

        $user = $this->create($request->all());

        $this->sendResetLinkEmail($request);

        return response()->json($user, 201);
    }

    public function sendResetEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email|max:255|unique:users'
        ]);

        $this->sendResetLinkEmail($request);

        return $this->message("邮件发送成功");
    }

    public function update(Request $request, User $user)
    {
        $user->update($request->all());

        return response()->json($user, 200);
    }

    public function delete(User $user)
    {
        $user->delete();

        return response()->json(null, 204);
    }

    public function getCteachers()
    {
        return new UserCollection(User::all());;
    }

    public function getAgents()
    {
        return new UserCollection(User::all());;
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


    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt(substr(md5(time()), 0, 8)),
        ]);
    }
}
