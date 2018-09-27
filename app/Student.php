<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;
use PhpParser\ErrorHandler\Collecting;
use App\Course;

class Student extends Model
{
    use SoftDeletes;
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
    protected $guarded = ['id', 'created_at', 'updated_at'];

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

    public function getOldLessons()
    {
        $lessons = $this->lessons()
            ->where('status', 1)
            ->get();
        return $lessons;
    }

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

    public function haveNewLessons()
    {
        if ($this->getNewLessons())
            return true;
        else
            return false;
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

    public function studentValue()
    {
        return $this->hasOne('App\StudentValue', 'student_id');
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

    // 设置学生状态为停课
    public function stop()
    {
        $this->status = -2;
        $this->save();
        return $this;
    }

    public function statusInit()
    {
        if ($this->status == 2)
        {
            if ($this->team)
            {
                $this->status = 0;
            }
            elseif ($this->getNewLessons())
            {
                $this->status = 1;
            }
        }
        elseif ($this->status == 1)
        {
            if (!$this->getNewLessons())
            {
                $this->status = 2;
            }
        }
        elseif ($this->status == 0)
        {
            if (!$this->team)
            {
                $this->status = 2;
            }
        }
        $this->save();
    }

    // 获取每周外教课节数
    public function oneWeekNumber()
    {
        return $this->courses()->count();
    }

    // 获取外教课消耗节数
    public function getWaijiaoCost()
    {
        return $this->getOldLessons()->sum('waijiao_cost');
    }

    // 获取中教课消耗节数
    public function getZhongjiaoCost()
    {
        return $this->getOldLessons()->sum('zhongjiao_cost');
    }

    // 获取精品课消耗节数
    public function getJingpinCost()
    {
        return $this->getOldLessons()->sum('jingpin_cost');
    }

    // 获取外教课充值数
    public function getWaijiao()
    {
        return $this->recharges()->sum('waijiao');
    }

    // 获取中教课充值数
    public function getZhongjiao()
    {
        return $this->recharges()->sum('zhongjiao');
    }

    // 获取精品课充值数
    public function getJingpin()
    {
        return $this->recharges()->sum('jingpin');
    }

    // 获取剩余外教课数
    public function getLeftWaijiao()
    {
        return $this->getWaijiao()-$this->getWaijiaoCost();
    }

    // 获取剩余中教课数
    public function getLeftZhongjiao()
    {
        return $this->getZhongjiao()-$this->getZhongjiaoCost();
    }

    // 获取剩余精品课数
    public function getLeftJingpin()
    {
        return $this->getJingpin()-$this->getJingpinCost();
    }

    // 获取已经使用掉的临时请假次数
    public function getLeaveCost()
    {
        return $this->getNotNewLessons()->where('status', 8)->count();
    }

    // 获取总临时请假次数
    public function getLeave()
    {
        return $this->recharges()->sum('leave');
    }

    // 获取剩余临时请假次数
    public function getLeftLeave()
    {
        return $this->getLeave()-$this->getLeaveCost();
    }

    // 设置复习课倒计时
    public function setFuxiValue()
    {
        $studentValue = $this->studentValue();
        if($studentValue)
        {
            if($this->getLeftZhongjiao()) {
                $studentValue->fuxi = ceil($this->getLeftWaijiao() / $this->getLeftZhongjiao());
            }
            else{
                $studentValue->fuxi = $this->getLeftWaijiao();
            }
        }
        else
        {
            $this->createStudentValue();
        }
    }

    // 设置精品课倒计时
    public function setJingpinValue()
    {
        $studentValue = $this->studentValue();
        if($studentValue)
        {
            if($this->getLeftJingpin())
            {
                $studentValue->jingpin = ceil($this->getLeftWaijiao()/$this->getLeftJingpin());
            }
            else{
                $studentValue->jingpin = $this->getLeftWaijiao();
            }
        }
        else
        {
            $this->createStudentValue();
        }
    }

    // 创建studentValue()
    public function createStudentValue()
    {
        if($this->getLeftJingpin()) {
            $jingpinValue = ceil($this->getLeftWaijiao() / $this->getLeftJingpin());
        }
        else{
            $jingpinValue = $this->getLeftWaijiao();
        }
        if($this->getLeftZhongjiao()) {
            $fuxiValue = ceil($this->getLeftWaijiao() / $this->getLeftZhongjiao());
        }
        else{
            $fuxiValue = $this->getLeftWaijiao();
        }
        return $this->studentValue()->create([
            'fuxi' => $jingpinValue,
            'jingpin' => $fuxiValue,
        ]);
    }

    // 检查是否有已经安排了的复习课
    public function haveNextFuxi(){
        if ($this->getNewLessons()->where('lesson_type', 'f')->first()){
            return 1;
        }
        else{
            return 0;
        }
    }

    // 检查是否有已经安排了的精品课
    public function haveNextJingpin(){
        if ($this->getNewLessons()->where('lesson_type', 'j')->first()){
            return 1;
        }
        else{
            return 0;
        }
    }

    // 获取复习课的显示系数 输出0：正常 输出1：黄色（下周） 输出2：红色（本周）
    public function nextFuxi()
    {
//        $after = 1;
//
//        $newlessons = $this -> lessons()
//            -> where('conduct' , 0 )
//            -> get();
//        foreach ( $newlessons as $newlesson )
//        {
//            if ( $newlesson -> type == 'f' )
//            {
//                $after = 0;
//                break;
//            }
//        }
//
//        $fuxi = 0;
//
//        if ( $after )
//        {
//            $lessons = $this -> lessons()
//                -> where('conduct' , 1 )
//                -> orderby('date' , 'desc' )
//                -> orderby('etime' , 'desc' )
//                -> with('cteacher')
//                -> get();
//            if ( $this -> recharges() -> sum('lessons1') - $lessons -> sum('cost1') > 0 )
//            {
//                foreach ( $lessons as $lesson )
//                {
//                    if ( $lesson -> type == 'w' )
//                    {
//                        $fuxi++;
//                    }
//                    elseif ( ( $lesson -> type == 'f' ) || ( $fuxi > 5 )  )
//                    {
//                        break;
//                    }
//                }
//            }
//        }
//        return $fuxi;
        if($this->getLeftZhongjiao() && !$this->haveNextFuxi()) {
            $oneWeek = $this->oneWeekNumber();
            $fuxi = $this->studentValue()->fuxi;
            if ($fuxi <= $oneWeek)
                return 2;
            elseif ($fuxi - $oneWeek <= $oneWeek)
                return 1;
            else
                return 0;
        }
        else{
            return 0;
        }
    }

    // 获取复习课的显示系数 输出0：正常 输出1：黄色（下周） 输出2：红色（本周）
    public function nextJingpin()
    {
//        $after = 1;
//
//        $newlessons = $this -> lessons()
//            -> where('conduct' , 0 )
//            -> get();
//        foreach ( $newlessons as $newlesson )
//        {
//            if ( $newlesson -> type == 'j' )
//            {
//                $after = 0;
//                break;
//            }
//        }
//
//        $jingpin = 0;
//
//        if ( $after )
//        {
//            $lessons = $this -> lessons()
//                -> where('conduct' , 1 )
//                -> orderby('date' , 'desc' )
//                -> orderby('etime' , 'desc' )
//                -> with('cteacher')
//                -> get();
//            if ( $this -> recharges() -> sum('lessons2') - $lessons -> sum('cost2') > 0 )
//            {
//                foreach ( $lessons as $lesson )
//                {
//                    if ( $lesson -> type == 'w' )
//                    {
//                        $jingpin++;
//                    }
//                    elseif ( ( $lesson -> type == 'j' ) || ( $jingpin > 5 )  )
//                    {
//                        break;
//                    }
//                }
//            }
//        }
//        return $jingpin;
        if ($this->getLeftJingpin() && !$this->haveNextJingpin()){
            $oneWeek = $this->oneWeekNumber();
            $jingpin = $this->studentValue()->jingpin;
            if ($jingpin <= $oneWeek)
                return 2;
            elseif ($jingpin-$oneWeek <= $oneWeek)
                return 1;
            else
                return 0;
        }
        else{
            return 0;
        }
    }

    // 获取复习课的显示系数 输出0：正常 输出1：黄色（下周续费） 输出2：红色（本周续费）
    public function getBalance()
    {
//        $lessons = $this -> lessons()
//            -> where('conduct' , 1 )
//            -> get();
//        $recharges = $this -> recharges;
//
//        // 固定课程信息
//        $courses = $this -> courses()
//            -> where(function($query){
//                $query -> where( 'edate' , null )
//                    -> orwhere( 'edate' , '>=' , Carbon::now() -> timestamp );
//            })
//            -> get();
//        if ( $courses -> sum('cost') > 0 )
//        {
//            return ceil( ( $recharges -> sum('lessons') - $lessons -> sum('cost') )/( $courses -> sum('cost') ) ) ;
//        }
//        else{
//            return 4;
//        }
        $oneWeek = $this->oneWeekNumber();
        $left = $this->getLeftWaijiao();
        if ($left <= $oneWeek)
            return 2;
        elseif ($left-$oneWeek <= $oneWeek)
            return 1;
        else
            return 0;
    }

    // 获取KK剩余提醒的显示系数 输出0：正常 输出1：黄色（下周续费） 输出2：红色（本周续费）
    public function getKKBalance()
    {
//        $lessons = $this -> lessons()
//            -> where('conduct' , 1 )
//            -> get();
//        $recharges = $this -> recharges;
//
//        // 固定课程信息
//        $courses = $this -> courses()
//            -> where(function($query){
//                $query -> where( 'edate' , null )
//                    -> orwhere( 'edate' , '>=' , Carbon::now() -> timestamp );
//            })
//            -> get();
//        if ( $courses -> sum('cost') > 0 )
//        {
//            return ceil( ( $recharges -> sum('lessons') - $lessons -> sum('cost') )/( $courses -> sum('cost') ) ) ;
//        }
//        else{
//            return 4;
//        }
        if ($this->kk_value <= 0){ // 当kk_value=1时表示不显示kk续费提醒
            $oneWeek = $this->oneWeekNumber();
            $left = $this->getLeftWaijiao()+$this->kk_value;
            if ($left <= $oneWeek)
                return 2;
            elseif ($left-$oneWeek <= $oneWeek)
                return 1;
            else
                return 0;
        }
    }

//    //处理添加固定课程请求(不添加关联单节课程)
//    public function createcourse($classinfo)
//    {
//        $classinfo['sid'] = $this -> id;
//        $classinfo['sdate'] = Carbon::parse($classinfo['sdate'] . ' 0:00:00');
//        if ( $classinfo['edate'] <> null )
//        {
//            $classinfo['edate'] = Carbon::parse($classinfo['edate'] . ' 23:59:59'); //edate的时间设定为该日期的最大值
//        }
//
//        return Course::create($classinfo);
//    }

    //对时间戳不作处理
//  protected function asDateTime($val)
//  {
//  	return $val;
//  }
//
}