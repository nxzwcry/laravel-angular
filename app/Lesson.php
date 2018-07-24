<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class Lesson extends Model
{
    use SoftDeletes;
    /**
     * 与模型关联的数据表。
     *
     * @var string
     */
    //指定表名
    protected $table = 'lessons';
    //指定关键字
    protected $primaryKey = 'id';
    //自动维护时间戳
    public $timestamps = true;

    protected $dates = ['start_datetime', 'end_datetime', 'deleted_at', 'created_at', 'updated_at'];

    //不允许批量赋值的字段
    protected $guarded = ['id', 'created_at', 'updated_at'];

    /**
     * 模型日期列的存储格式
     *
     * @var string
     */
//    protected $dateFormat = 'U';

    public function student()
    {
        return $this->belongsTo('App\Student' , 'student_id');
    }

    public function cteacher()
    {
        return $this->belongsTo('App\User' , 'cteacher_id');
    }

    public function fteacher()
    {
        return $this->belongsTo('App\Fteacher' , 'fteacher_id');
    }

    public function place()
    {
        return $this->belongsTo('App\Place' , 'place_id');
    }

    public function file()
    {
        return $this->belongsTo('App\File' , 'file_id');
    }

    public function video()
    {
        return $this->belongsTo('App\Video' , 'video_id');
    }

    public function courseware()
    {
        return $this->belongsTo('App\Courseware' , 'courseware_id');
    }

    public function team()
    {
        return $this->belongsTo('App\Team' , 'team_id');
    }

    public function copyToStudent($sid) //将该节课程复制给学生
    {
        $linfo = $this->toArray();
        $linfo['student_id'] = $sid;
        $linfo['score'] = 0;
        $linfo['report_id'] = null;
        $linfo['note'] = null;
        return Lesson::create($linfo);
    }

    public function sameLesson()
    {
        $lessons = Lesson::where('syn_code', $this->syn_code)->get();
        if($lessons->first())
            return $lessons;
        else
            return null;
    }

    // 检查课程状态，如果课程时间已过标记课程为已结束课程
    public function chackStatus()
    {
        if (Carbon::now()->gte($this->end_datetime))
        {
            $this->setFinish();
        }
        return $this->status;
    }

    // 设置课程为正常结束课程
    public  function setFinish()
    {
        $this->status = 1;
        $this->save();
    }

    // 设置课程为临时请假
    public  function setTodayLeave()
    {
        if ($this->lesson_type <> 'b')
        {
            $user = Auth::user();
            if ($this->student->getLeftLeave() > 0){
                $this->status = 8;
                $this->waijiao_cost = 0;
                $this->zhongjiao_cost = 0;
                $this->jingpin_cost = 0;
                $this->note = $this->note . "临时请假,不扣课时({$user->name})";
            }
            else{
                $this->status = 1;
                $this->note = $this->note . "临时请假次数已用完,扣除课时({$user->name})";
            }
            $this->save();
        }
    }

    // 设置课程为正常请假
    public  function setLeave()
    {
        $user = Auth::user();
        if ($this->lesson_type <> 'b'){
            $this->waijiao_cost = 0;
            $this->zhongjiao_cost = 0;
            $this->jingpin_cost = 0;
            $this->note = $this->note . "正常请假,不扣课时({$user->name})";
        }
        else{
            $this->zhongjiao_cost = 0;
            $this->note = $this->note . "班课正常请假,不扣除中教课时({$user->name})";
        }
        $this->status = 7;
        $this->save();
    }

    // 发送2-26小时上课提醒
    public  function sendStartMassage()
    {
        $student = $this->student;
        if ($student)
        {
            if (($this->fteacher)&&($this->cteacher))
            {
                $teacher = "{$this->fteacher->name} & {$this->cteacher->ename}({$this->cteacher->name})";
            }
            else
            {
                $teacher = "";
                if ($this->cteacher)
                {
                    $teacher = "{$this->cteacher->ename}({$this->cteacher->name})";
                }
                if ($this->fteacher)
                {
                    $teacher = $this->fteacher->name;
                }
            }
            if ($this->date > Carbon::now() -> toDateString() )
            {
                $first = '深泉教育提醒 明天 有您的课程';
            }
            else
            {
                $first = '深泉教育提醒 今天 有您的课程';
            }
            $message = ['first' => $first ,
                'sname' => $student -> name . ' ' . $student -> ename ,
                'time' => $lesson -> date . ' ' . substr( $lesson -> stime , 0 , 5 ) . '~' . substr( $lesson -> etime , 0 , 5 ) ,
                'place' => $lesson -> place -> name . '',
                'teacher' => $teacher,
                'mid' => $lesson -> mid . ''];
            $wechats = $student -> wechats;
            foreach( $wechats as $wechat )
            {
                $message['touser'] = $wechat -> openid;
                $this -> startmassage( $message );
            }
        }
    }

}