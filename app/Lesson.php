<?php

namespace App;

use App\Events\LessonCreating;
use App\Events\LessonSaved;
use App\Events\LessonSaving;
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

    protected $dates = ['start_datetime', 'end_datetime', 'fteacher_datetime', 'deleted_at', 'created_at', 'updated_at'];

    //不允许批量赋值的字段
    protected $guarded = ['id', 'created_at', 'updated_at'];

    /**
     * 模型日期列的存储格式
     *
     * @var string
     */
//    protected $dateFormat = 'U';

    /**
     * 模型的事件映射。
     *
     * @var array
     */
    protected $dispatchesEvents = [
        'saving' => LessonSaving::class,
        'creating' => LessonCreating::class,
    ];

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

//    public static function create(array $data)
//    {
////        $stime = Carbon::createFromTimestamp($data['start_datetime'], 'Asia/Shanghai');
////        $etime = Carbon::createFromTimestamp($data['end_datetime'], 'Asia/Shanghai');
////        $data['start_datetime'] = $stime;
////        $data['end_datetime'] = $etime;
//        $lesson = static::query()->create($data);
//        if ($lesson->isTimeOut())
//        {
//            $lesson->setFinish();
//        }
//        return ['now' => Carbon::now(), 'lesson' => $lesson->end_datetime];
//    }

    // 创建单节班课，并为班课中的每一个学生创建班课子课
    public static function createTeamLesson(array $data)
    {
        if ($data['team_id'])
        {
            $team = Team::find($data['team_id']);
            if ($team)
            {
                $teamData = $data;
                $teamData['lesson_type'] = 'bt';
                $teamLesson = Lesson::create($teamData);
                $teamLesson['status'] = 0;
                $students = $team->students;
                foreach ($students as $student)
                {
                    $teamLesson->createSubLesson($student->id);
                }
            }
        }
        return $teamLesson;
    }

    public function getSubLessons()
    {
        if($this->lesson_type == 'bt')
        {
            return Lesson::where('syn_code', $this->id)->get();
        }
        else{
            return null;
        }
    }

    public function createSubLesson($sid)
    {
        $data = $this->toArray();
        unset($data['id']);
        $data['syn_code'] = $this->id;
        $data['lesson_type'] = 'b';
        $data['student_id'] = $sid;
        return Lesson::create($data);
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

    // 课程是否过期
    public function isTimeOut()
    {
        if (Carbon::now()->gte($this->end_datetime))
        {
            return true;
        }
        return false;
    }

    // 设置课程为待确认
    public function setConfirm()
    {
        $this->status = 2;
    }

    // 删除班课
    public function deleteTeamLesson()
    {
        $lessons = Lesson::where('syn_code', $this->id)->get();
        foreach ($lessons as $lesson) {
            $lesson->delete();
        }
    }

    // 请假
    public function leave()
    {
        $this->zhongjiao_cost = 0;
        $this->status = 3;
        $this->save();
    }

    // 设置课程为未上课程
    public  function setNew()
    {
        $this->status = 0;
    }

    // 设置课程为正常结束课程
    public  function setFinish()
    {
        $this->status = 1;
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