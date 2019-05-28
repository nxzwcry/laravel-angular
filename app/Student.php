<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;
use PhpParser\ErrorHandler\Collecting;
use App\Course;
use Spatie\Activitylog\Traits\LogsActivity;

class Student extends Model
{
    use SoftDeletes;
    use LogsActivity;
    protected static $logUnguarded = true;
    protected static $logOnlyDirty = true;
    /**
     * 与模型关联的数据表。
     *
     * @var string
     */
    //指定表名
    protected $table = 'students';
    //指定关键字
    protected $primaryKey = 'id';
    //自动维护时间戳
    public $timestamps = true;

    protected $dates = ['birthday', 'created_at', 'updated_at', 'deleted_at'];

    //不允许批量赋值的字段
    protected $guarded = ['id', 'created_at', 'updated_at', 'deleted_at'];

     /**
     * 模型日期列的存储格式
     *
     * @var string
     */
//    protected $dateFormat = 'U';

    public function lessons()
    {
        return $this->hasMany('App\Lesson', 'student_id');
    }

    // 获取已过期课程（课程状态为未上以外）
    public function getNotNewLessons()
    {
        $lessons = $this->lessons()
            ->where('status', '>',0)
            ->orderBy('start_datetime', 'desc')
            ->get();
        if($lessons)
        {
            if($lessons->first())
                return $lessons;
        }
        return null;
    }

    // 获取未上课程
    public function getNewLessons()
    {
        $lessons = $this->lessons()
            ->where('status', 0)
            ->orderBy('start_datetime')
            ->get();
        if($lessons)
        {
            if($lessons->first())
                return $lessons;
        }
        return null;
    }

    public function courses()
    {
        return $this->hasMany('App\Course', 'student_id');
    }

    public function recharges()
    {
        return $this->hasMany('App\Recharge', 'student_id');
    }

    public function wechats()
    {
        return $this->hasMany('App\Wechat', 'student_id');
    }

    public function phones()
    {
        return $this->hasMany('App\Phone', 'student_id');
    }

    public function team()
    {
        return $this->belongsTo('App\Team' , 'team_id' , 'id');
    }

    public function cteacher()
    {
        return $this->belongsTo('App\User', 'cteacher_user_id');
    }

    public function agent()
    {
        return $this->belongsTo('App\User', 'agent_user_id');
    }

    public function getAge()
    {
        return Carbon::now()->diffInYears($this->birthday, 'true');
    }

    public function fteacher()
    {
        $course = $this->courses()->first();
        if ($course)
        {
            return $course->fteacher;
        }
        return null;
    }

    // 获取学生积分
    public function getScore()
    {
        return $this->lessons()->sum('score');
    }

    // 设置学生状态为停课（不续费）
    public function stop()
    {
        $this->status = -2;
        $this->save();
        return $this;
    }

    // 整理学生状态
    public function statusInit()
    {
        // 不续课学生不参与整理（不参与状态自动转移）
        if ($this->status >= 0)
        {
            // 优先度：班课>1对1
            // 班课
            if ($this->team)
            {
                $this->status = 0;
                $this->save();
                return 0;
            }
            // 1对1
            if ($this->getNewLessons())
            {
                $this->status = 1;
                $this->save();
                return 1;
            }
            // 未排课
            $this->status = 2;
            $this->save();
            return 2;
        }
        return $this->status;
    }

    // 获取外教课消耗节数
    public function getWaijiaoCost(Carbon $etime = null)
    {
        if (!$etime)
        {
            $etime = Carbon::now();
        }
        $lessons = $this->getNotNewLessons();
        if ($lessons)
        {
            return $lessons->where('start_datetime', '<=', $etime)->sum('waijiao_cost');
        }
        return 0;
    }

    // 获取中教课消耗节数
    public function getZhongjiaoCost(Carbon $etime = null)
    {
        if (!$etime)
        {
            $etime = Carbon::now();
        }
        $lessons = $this->getNotNewLessons();
        if ($lessons)
        {
            return $lessons->where('start_datetime', '<=', $etime)->sum('zhongjiao_cost');
        }
        return 0;
    }

    // 获取精品课消耗节数
    public function getJingpinCost(Carbon $etime = null)
    {
        if (!$etime)
        {
            $etime = Carbon::now();
        }
        $lessons = $this->getNotNewLessons();
        if ($lessons)
        {
            return $lessons->where('start_datetime', '<=', $etime)->sum('jingpin_cost');
        }
        return 0;
    }

    // 获取外教课充值数
    public function getWaijiao(Carbon $etime = null)
    {
        if (!$etime)
        {
            $etime = Carbon::now();
        }
        return $this->recharges()->where('created_at', '<=', $etime)->sum('waijiao');
    }

    // 获取中教课充值数
    public function getZhongjiao(Carbon $etime = null)
    {
        if (!$etime)
        {
            $etime = Carbon::now();
        }
        return $this->recharges()->where('created_at', '<=', $etime)->sum('zhongjiao');
    }

    // 获取精品课充值数
    public function getJingpin(Carbon $etime = null)
    {
        if (!$etime)
        {
            $etime = Carbon::now();
        }
        return $this->recharges()->where('created_at', '<=', $etime)->sum('jingpin');
    }

    // 获取剩余外教课数
    public function getLeftWaijiao(Carbon $etime = null)
    {
        if (!$etime)
        {
            $etime = Carbon::now();
        }
        return $this->getWaijiao($etime)-$this->getWaijiaoCost($etime);
    }

    // 获取剩余中教课数
    public function getLeftZhongjiao(Carbon $etime = null)
    {
        if (!$etime)
        {
            $etime = Carbon::now();
        }
        return $this->getZhongjiao($etime)-$this->getZhongjiaoCost($etime);
    }

    // 获取剩余精品课数
    public function getLeftJingpin(Carbon $etime = null)
    {
        if (!$etime)
        {
            $etime = Carbon::now();
        }
        return $this->getJingpin($etime)-$this->getJingpinCost($etime);
    }

}