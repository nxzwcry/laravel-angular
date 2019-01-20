<?php

namespace App;

use App\Events\LessonCreating;
use App\Events\LessonSaved;
use App\Events\LessonSaving;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Log;

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
    protected $guarded = ['id', 'status', 'report_id', 'score', 'created_at', 'updated_at'];

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
        // 更新时检查课程状态并更新
        'updating' => LessonSaving::class,
        // 创建时检查课程时间并设置课程状态
        'creating' => LessonCreating::class,
        // 保存后更新学生状态
        'saved' => LessonSaved::class,
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


    // 在修改班级的lesson信息后，调用此函数，修改与该课程相关联的所有子课（每个学生的该节lesson）的信息
    // 需要注意$guarded数组中的列不允许使用update批量赋值
    public function updateTeamLesson(array $data)
    {
        if ($this->lesson_type == 'bt')
        {
            $lessons = $this->getSubLessons();
            foreach ($lessons as $lesson)
            {
                $lesson->update($data);
            }
            $this->update($data);
        }
        return $lessons;
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
                $students = $team->students;
                foreach ($students as $student)
                {
                    $teamLesson->createSubLesson($student->id);
                }
            }
        }
        return $teamLesson;
    }

    // 如果课程是班级lesson的话，返回该班级lesson的子课（每个学生的该节lesson）
    public function getSubLessons()
    {
        if($this->lesson_type == 'bt')
        {
            // syn_code字段存放班级lesson的id，如果syn_code为空的话，证明它是一节独立的课程
            return Lesson::where('syn_code', $this->id)
                ->where('lesson_type', 'b')
                ->get();
        }
        else{
            return null;
        }
    }

    // 根据传入的学生id，创建子课
    public function createSubLesson($sid)
    {
        $new = $this->replicate();
        $new->syn_code = $this->id;
        $new->lesson_type = 'b';
        $new->student_id = $sid;
        $new->save();
        return $new;
    }

    // 根据学生id，复制课程给该学生
    public function copyToStudent($sid)
    {
        $new = $this->replicate();
        $new->student_id = $sid;
        $new->save();
        return $new;
    }

//    public function sameLesson()
//    {
//        $lessons = Lesson::where('syn_code', $this->syn_code)->get();
//        if($lessons->first())
//            return $lessons;
//        else
//            return null;
//    }

    // 检查lesson是否过期，并设置相应的状态
    public function chackAndSetStatus()
    {
        // 判断课程是否在保存时从未上可以变为已上或者待确认
        if ($this->status == 0)
        {
            // 如果课程已过期
            if ($this->isTimeOut())
            {
                // 有中教参与的课程过期后变为待确认
                // 班级lesson直接变为已上
                if ($this->cteacher && $this->lesson_type <> 'bt')
                {
                    $this->setConfirm();
                    Log::info($this->id.'待确认;');
                }
                // 无中教参与的课程直接变为已上
                else {
                    $this->setFinish();
                    Log::info($this->id.'完课;');
                }
            }
        }
        // 判断课程是否在保存时从已上或者待确认可以变为未上
        elseif($this->status == 1 || $this->status == 2)
        {
            // 如果课程未过期，则设置为未上
            if (!$this->isTimeOut())
            {
                $this->setNew();
            }
        }
    }

    // 课程是否过期
    public function isTimeOut()
    {
        // 根据课程结束时间判断课程是否过期
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
        // 删除班课时需要同时删除该课程的子课
        $lessons = Lesson::where('syn_code', $this->id)
            ->where('lesson_type', 'b')
            ->get();
        foreach ($lessons as $lesson) {
            $lesson->delete();
        }
    }

    // 创建补课
    public function createBuke(array $data)
    {
        // 输入信息：代课教师、开始时间、结束时间
        $lessonInfo = $this->toArray();
        $lessonInfo['cteacher_id'] = $data['cteacher_id'];
        $lessonInfo['start_datetime'] = $data['start_datetime'];
        $lessonInfo['end_datetime'] = $data['end_datetime'];
        $lessonInfo['syn_code'] = $lessonInfo['id'];
        $lessonInfo['lesson_type'] = 'bu';
        // 重设课时消耗信息
        $lessonInfo['zhongjiao_cost'] = 1;
        $lessonInfo['waijiao_cost'] = 0;
        $lessonInfo['jingpin_cost'] = 0;
        $lessonInfo['team_id'] = null;
        unset($lessonInfo['fteacher_id']);
        unset($lessonInfo['fteacher_datetime']);
        return Lesson::create($lessonInfo);
    }

    // 请假操作
    public function setLeave()
    {
        // 请假时将中教课时清空，外教课时保留
        $this->zhongjiao_cost = 0;
        $this->status = 3;
    }

    // 将课程设置为已补课
    public function setBuke()
    {
        $this->status = 4;
    }

    // 设置课程为未上课程
    public function setNew()
    {
        $this->status = 0;
    }

    // 设置课程为正常结束课程
    public function setFinish()
    {
        $this->status = 1;
    }

    // 根据天数，获取过去days天的已上课程
    public static function getOldLessons($days)
    {
        if ($days>=0)
        {
            // 获取days天前的0点
            $time = Carbon::now('Asia/Shanghai')->subDays($days)->startOfDay();
            return Lesson::where('end_datetime', '>=', $time)
                ->where('status', '>', 0)
                ->where('lesson_type', '<>', 'b') // b作为bt的子课显示
                ->orderby('start_datetime' , 'desc' )
                ->get();
        }
        return [];
    }

    // 根据天数，获取未来days天的未上课程
    public static function getNewLessons($days)
    {
        if ($days>=0)
        {
            // 获取days天后的23点59分
            $time = Carbon::now('Asia/Shanghai')->addDays($days)->endOfDay();
            return Lesson::where('end_datetime', '<=', $time)
                ->where('status', 0)
                ->where('lesson_type', '<>', 'b') // b作为bt的子课显示
                ->orderby('start_datetime')
                ->get();
        }
        return [];
    }

    // 获取lesson的开始时间在stime到etime之间的课程
    public static function getTimeLessonList(Carbon $stime, Carbon $etime)
    {
        if ($stime && $etime)
        {
            return Lesson::where('start_datetime', '>=', $stime)
                ->where('start_datetime', '<=', $etime)
                ->where('lesson_type', '<>', 'b') // b作为bt的子课显示
                ->orderby('start_datetime')
                ->get();
        }
        return [];
    }

    // 获取stime到etime之间的所有课程，用作统计使用
    public static function getCountList(Carbon $stime, Carbon $etime)
    {
        if ($stime && $etime)
        {
            return Lesson::where('start_datetime', '>=', $stime)
                ->where('start_datetime', '<=', $etime)
                ->get();
        }
        return [];
    }

    // 设置课程为临时请假
//    public  function setTodayLeave()
//    {
//        if ($this->lesson_type <> 'b')
//        {
//            $user = Auth::user();
//            if ($this->student->getLeftLeave() > 0){
//                $this->status = 8;
//                $this->waijiao_cost = 0;
//                $this->zhongjiao_cost = 0;
//                $this->jingpin_cost = 0;
//                $this->note = $this->note . "临时请假,不扣课时({$user->name})";
//            }
//            else{
//                $this->status = 1;
//                $this->note = $this->note . "临时请假次数已用完,扣除课时({$user->name})";
//            }
//            $this->save();
//        }
//    }

    // 设置课程为正常请假
//    public  function setLeave()
//    {
//        $user = Auth::user();
//        if ($this->lesson_type <> 'b'){
//            $this->waijiao_cost = 0;
//            $this->zhongjiao_cost = 0;
//            $this->jingpin_cost = 0;
//            $this->note = $this->note . "正常请假,不扣课时({$user->name})";
//        }
//        else{
//            $this->zhongjiao_cost = 0;
//            $this->note = $this->note . "班课正常请假,不扣除中教课时({$user->name})";
//        }
//        $this->status = 7;
//        $this->save();
//    }

    // 发送2-26小时上课提醒
//    public  function sendStartMassage()
//    {
//        $student = $this->student;
//        if ($student)
//        {
//            if (($this->fteacher)&&($this->cteacher))
//            {
//                $teacher = "{$this->fteacher->name} & {$this->cteacher->ename}({$this->cteacher->name})";
//            }
//            else
//            {
//                $teacher = "";
//                if ($this->cteacher)
//                {
//                    $teacher = "{$this->cteacher->ename}({$this->cteacher->name})";
//                }
//                if ($this->fteacher)
//                {
//                    $teacher = $this->fteacher->name;
//                }
//            }
//            if ($this->date > Carbon::now() -> toDateString() )
//            {
//                $first = '深泉教育提醒 明天 有您的课程';
//            }
//            else
//            {
//                $first = '深泉教育提醒 今天 有您的课程';
//            }
//            $message = ['first' => $first ,
//                'sname' => $student -> name . ' ' . $student -> ename ,
//                'time' => $lesson -> date . ' ' . substr( $lesson -> stime , 0 , 5 ) . '~' . substr( $lesson -> etime , 0 , 5 ) ,
//                'place' => $lesson -> place -> name . '',
//                'teacher' => $teacher,
//                'mid' => $lesson -> mid . ''];
//            $wechats = $student -> wechats;
//            foreach( $wechats as $wechat )
//            {
//                $message['touser'] = $wechat -> openid;
//                $this -> startmassage( $message );
//            }
//        }
//    }

}