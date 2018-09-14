<?php

namespace App;

use App\Events\CourseSaved;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;
use Log;

class Course extends Model
{
    use SoftDeletes;
    /**
     * 与模型关联的数据表。
     *
     * @var string
     */
    //指定表名
    protected $table = 'courses';
    //指定关键字
    protected $primaryKey = 'id';
    //自动维护时间戳
    public $timestamps = true;

    protected $dates = ['start_time', 'end_time', 'fteacher_time', 'created_at', 'updated_at', 'deleted_at'];
    //不允许批量赋值的字段
    protected $guarded = [ 'id' , 'created_at' , 'updated_at' ];

    /**
     * 模型的事件映射。
     *
     * @var array
     */
    protected $dispatchesEvents = [
        'created' => CourseSaved::class,
    ];

    /**
     * 模型日期列的存储格式
     *
     * @var string
     */
//    protected $dateFormat = 'U';

//    //edate的时间设定为该日期的最大值
//    public function setEdateAttribute($value)
//    {
//        if ( $value == null ) {$this->attributes['edate'] = null;}
//        else
//        {$this->attributes['edate'] = $value -> getTimestamp() ;}
//    }

//    public function getEdateAttribute($value)
//    {
//        if ( $value == null ) { return null; }
//        return Carbon::createFromTimeStamp($value);
//    }

    public function student()
    {
        return $this->belongsTo('App\Student' , 'student_id');
    }

    public function team()
    {
        return $this->belongsTo('App\Team' , 'team_id');
    }

//    public function lessons()
//    {
//        return $this->hasMany('App\Lesson', 'courseid');
//    }
//
//    public function nextlessons()
//    {
//        return $this-> lessons() -> where('conduct' , 0 );
//    }

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

    public function courseware()
    {
        return $this->belongsTo('App\Courseware' , 'courseware_id');
    }

//    public function stop()
//    {
//        $this -> edate = Carbon::now() -> subSecond();
//        $this -> save();
//        return $this -> nextlessons() ->delete();
//    }

//    public function copytostudent($sid) //将该节课程复制给学生
//    {
//        $cinfo = $this -> toArray();
//        $cinfo['sid'] = $sid;
//        return Course::create($cinfo);
//    }

//    public function sameclasscourse()
//    {
//        return Course::where('class_id' , $this -> class_id)
//            -> where('dow' , $this -> dow)
//            -> where('sdate' , $this -> sdate)
//            -> where('stime' , $this -> stime)
//            -> get();
//    }

    public function createMonthLessons($month = null)
    {
        if($this->dow)
        {
            if ($month)
            {
                $temp = new Carbon();
                $temp->month = $month;
                $monthStart = $temp->startOfMonth();
                Carbon::setTestNow($monthStart);
            }
            $now = Carbon::now('Asia/Shanghai');
            $tail = $now->endOfMonth();
            $nextDay = new Carbon('next ' . $this->dow, 'Asia/Shanghai');
            $nextDay->hour = 9;
            if (Carbon::hasTestNow())
            {
                Carbon::setTestNow();
            }
            if($nextDay){
                while ($tail->gte($nextDay))
                {
                    $this->createLessonFromDate($nextDay);
                    $nextDay->addDays(7);
                }
            }
        }
    }

//    public function createLessons(Carbon $sdate, Carbon $edate)
//    {
//        //计算开课日期后的第一节课的日期
//        $next = clone $sdate;
//        $next = $this->nextDay($next);
//        $i = 0;
//        while ($next->lte($edate))
//        {
//            $lesson = $this->createLessonFromDate($next);
//            $next->addDays(7);
//            $i++;
//        }
//
//        return $i;
//    }

//    protected function nextDay(Carbon $start) //计算从$start开始的下一个上课日，包括$start
//    {
//        if ($start->dayOfWeek <= $this->dow )
//        {
//            $start->addDays($this->dow - $start->dayOfWeek ); // dayofWeek 0~6
//        }
//        else
//        {
//            $start->addDays($this->dow - $start->dayOfWeek + 7);
//        }
//        return $start;
//    }

//    public function CreateNextLesson() //创建本系列课程的下一节单节课程
//    {
//        $lesson = $this -> lessons() -> where('conduct' , 0) -> first();
////        Log::info($lesson);
//        if ( !$lesson )
//        {
//            Log::info('开始创建下一节课程');
//            $next = Carbon::now()->addDays(1);
//            $nxet = $this -> NextDay($next);
//
//            if ( $this -> edate == null || $this -> edate -> gt( $nxet ) )
//            {
//                return $this -> CreateLessonFromDate($next -> toDateString());
//            }
//        }
//        return 0;
//    }

    public function createLessonFromDate(Carbon $date)
    {
        $lessoninfo = $this->toArray();
//        $date->timezone('UTC');
        $stime = Carbon::createFromTimestampUTC($date->timestamp);
        $etime = Carbon::createFromTimeStampUTC($date->timestamp);
        $stime->setTime($this->start_time->hour, $this->start_time->minute);
        $etime->setTime($this->end_time->hour, $this->end_time->minute);
        $lessoninfo['start_datetime'] = $stime->timestamp;
        $lessoninfo['end_datetime'] = $etime->timestamp;
        if ($this->fteacher_time)
        {
            $ftime = Carbon::createFromTimeStampUTC($date->timestamp);
            $ftime->setTime($this->fteacher_time->hour, $this->fteacher_time->minute);
            $lessoninfo['fteacher_datetime'] = $ftime->timestamp;
        }
        unset($lessoninfo['id']);
        unset($lessoninfo['dow']);
        unset($lessoninfo['start_time']);
        unset($lessoninfo['end_time']);
        unset($lessoninfo['fteacher_time']);
        unset($lessoninfo['updated_at']);
        unset($lessoninfo['created_at']);
//        unset($lessoninfo['courseware']);
        if($lessoninfo['lesson_type'] == 'b')
        {
            $lesson = Lesson::createTeamLesson($lessoninfo);
        }
        else{
            $lesson = Lesson::create($lessoninfo);
        }
//        $lesson->chackStatus();
        return $lesson;
    }

}