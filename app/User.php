<?php

namespace App;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Log;
use Spatie\Permission\Traits\HasRoles;
use App\Notifications\ResetEmail as RestPasswordNotification;
use Spatie\Permission\Models\Role;

class User extends Authenticatable
{
    use HasRoles, HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'ename', 'mid',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $guard_name = 'api';

    /**
     * 自定义用Passport授权登录：邮箱+密码
     * @param $username
     * @return mixed
     */
    public function findForPassport($email)
    {
        return self::where('email', $email)->first();
    }

    // 作为顾问所关联的学生
    public function agentStudents()
    {
        return $this->hasMany('App\Student', 'agent_user_id');
    }

    // 作为老师所关联的学生
    public function teacherStudents()
    {
        return $this->hasMany('App\Student', 'cteacher_user_id');
    }

    // 发送密码重置邮件
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new RestPasswordNotification($token));
    }


    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    static public function create(array $data)
    {
        // 当用户被创建时设置随机密码
        $data['password'] = bcrypt(substr(md5(time()), 0, 8));
        $user = static::query()->create($data);
        $user->changeRole($data);
        return $user;
    }

    // 修改用户角色，传入参数为角色id数组
    public function changeRole(array $data)
    {
        $role_ids = $data['role'];
        if ($role_ids)
        {
            $roles = Role::find($role_ids);
            $this->syncRoles($roles);
        }
    }
}
