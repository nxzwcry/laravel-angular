<?php

namespace App;

use App\Events\CourseSaved;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;
use Log;

// 固定课程类，每月根据学生、班级的固定课程来创建lessons（单节课程）
// 固定课程的定义为每周周期性固定上课的课程，为创建lesson的模板

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


    // 固定课程首次创建时，创建lessons
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

    // 根据传入的月份参数，创建固定课程该月的lessons
    // 不会创建当天的课程（如当前时间是周二，创建周二的固定课程时，会从下一周开始）
    // 当传入参数大于12时视为下一年
    public function createMonthLessons($month = null)
    {
        if($this->dow)
        {
            // 如果传入月份不为null的话，设置一个虚拟的now为传入月份的起始时间
            if ($month)
            {
                $temp = Carbon::now('Asia/Shanghai');

                // 如果传入月份大于12，对月份和年份进行处理
                if ($month>12)
                {
                    $temp->month = $month-12;
                    $temp->addYear();
                }
                else
                {
                    $temp->month = $month;
                }

                // 将now设置为传入月份的起始时间（1日0点0分）
                $monthStart = $temp->startOfMonth();
                Carbon::setTestNow($monthStart);
            }

            // 如果传入月份为null的话，意味着创建当前月份的课程
            $now = Carbon::now('Asia/Shanghai');
            $tail = $now->endOfMonth(); // 设定tail为北京时间当月最后一天的23点59分

            // 因为后面要用到next，为了不漏掉起始日期，这里对now的时间减1天
            Carbon::setTestNow(Carbon::now('Asia/Shanghai')->subDay());
            $nextDay = new Carbon('next ' . $this->dow, 'Asia/Shanghai');

            // 因后面需要用到比较，故重置now为真正的现在时间
            Carbon::setTestNow();
            if($nextDay){
                if (Carbon::now()->gte($nextDay)) // 如果出现了当天的日期，去除
                {
                    $nextDay->addDays(7);
                }
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


    // 根据传入的日期，创建该日期的课程
    public function createLessonFromDate(Carbon $date)
    {
        // 将传入时间分别拷贝至stime和etime，并设置时区
        $stime = Carbon::createFromTimestampUTC($date->timestamp)->setTimezone('Asia/Shanghai');
        $etime = Carbon::createFromTimeStampUTC($date->timestamp)->setTimezone('Asia/Shanghai');
        // 设置具体上下课时间
        $stime->setTime($this->start_time->setTimezone('Asia/Shanghai')->hour, $this->start_time->minute);
        $etime->setTime($this->end_time->setTimezone('Asia/Shanghai')->hour, $this->end_time->minute);

        // 准备创建lesson时需要使用的其他数据
        $lessoninfo = $this->toArray();
        $lessoninfo['start_datetime'] = $stime->timestamp;
        $lessoninfo['end_datetime'] = $etime->timestamp;
        if ($this->fteacher_time)
        {
            $ftime = Carbon::createFromTimeStampUTC($date->timestamp)->setTimezone('Asia/Shanghai');
            $ftime->setTime($this->fteacher_time->setTimezone('Asia/Shanghai')->hour, $this->fteacher_time->minute);
            $lessoninfo['fteacher_datetime'] = $ftime->timestamp;
        }
        unset($lessoninfo['id']);
        unset($lessoninfo['dow']);
        unset($lessoninfo['start_time']);
        unset($lessoninfo['end_time']);
        unset($lessoninfo['fteacher_time']);
        unset($lessoninfo['updated_at']);
        unset($lessoninfo['created_at']);

        if($lessoninfo['lesson_type'] == 'b')
        {
            $lesson = Lesson::createTeamLesson($lessoninfo);
        }
        else{
            $lesson = Lesson::create($lessoninfo);
        }

        return $lesson;
    }

}