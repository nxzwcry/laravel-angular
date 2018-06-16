<?php

namespace App;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Permission\Traits\HasRoles;
use App\Notifications\ResetEmail as RestPasswordNotification;

class User extends Authenticatable
{
    use HasRoles, HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * 自定义用Passport授权登录：邮箱+密码
     * @param $username
     * @return mixed
     */
    public function findForPassport($email)
    {
        return self::where('email', $email)->first();
    }

    public function agentStudents()
    {
        return $this->hasMany('App\Student', 'agent_user_id');
    }

    public function teacherStudents()
    {
        return $this->hasMany('App\Student', 'cteacher_user_id');
    }

    public function sendPasswordResetNotification($token)
    {
        $this->notify(new RestPasswordNotification($token));
    }
}
