<?php

namespace App;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Log;
use Spatie\Permission\Traits\HasRoles;
use App\Notifications\ResetEmail as RestPasswordNotification;
use Spatie\Permission\Models\Role;
use Spatie\Activitylog\Traits\LogsActivity;

class User extends Authenticatable
{
    use HasRoles, HasApiTokens, Notifiable;
    use LogsActivity;
    protected static $logUnguarded = true;
    protected static $logOnlyDirty = true;

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

    // 员工离职，不在列表中显示，进行此操作前徐手动将与该员工相关学生更改后再办理离职
    public function deactive()
    {
        $this->active = false;
        $this->save();
    }

    public function isActive()
    {
        return $this->active;
    }

    public function getAgentCount()
    {
        // 只有一对一和班课的正常学生才计算人数
        return $this->agentStudents->where('status', '>=', 0)->where('status', '<', 2)->count();
    }

    public function getTeacheCount()
    {
        // 只有一对一和班课的正常学生才计算人数
        return $this->teacherStudents->where('status', '>=', 0)->where('status', '<', 2)->count();
    }
}
