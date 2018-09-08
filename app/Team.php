<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;

class Team extends Model
{
    use SoftDeletes;
    /**
     * 与模型关联的数据表。
     *
     * @var string
     */
    //指定表名
    protected $table = 'teams';
    //指定关键字
    protected $primaryKey = 'id';
    //自动维护时间戳
    public $timestamps = true;

    //不允许批量赋值的字段
    protected $guarded = ['id', 'created_at', 'updated_at'];

    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    /**
     * 模型日期列的存储格式
     *
     * @var string
     */
//    protected $dateFormat = 'U';

    public function courses()
    {
        return $this->hasMany('App\Course' ,'team_id');
    }

    public function lessons()
    {
        return $this->hasMany('App\Lesson' ,'team_id');
    }

    public function students()
    {
        return $this->hasMany('App\Student' ,'team_id');
    }

    public function cteacher()
    {
        return $this->belongsTo('App\User', 'cteacher_user_id');
    }

    public function place()
    {
        return $this->belongsTo('App\Place' , 'place_id');
    }

    public function addStudents(array $data)
    {
        $students = Student::find($data);
        foreach ($students as $student)
        {
            $this->addStudent($student);
        }
    }

//    public function getPlace() //获取该班级上课地点
//    {
//        $course = $this->getCourse();
//        if ($course)
//        {
//            return $course->palce;
//        }
//        else
//        {
//            return null;
//        }
//
//    }

//    public function getCteacher() //获取该班级负责老师
//    {
//        $course = $this->getCourse();
//        if ($course)
//        {
//            return $course->cteacher;
//        }
//        else
//        {
//            return null;
//        }
//
//    }

    public function getNewLessons()
    {
        return $this->lessons()
            ->where('lesson_type', 'bt')
            ->where('status', '0')
            ->get();
    }

    public function getNotNewLessons()
    {
        return $this->lessons()
            ->where('lesson_type', 'bt')
            ->where('status', '>','0')
            ->get();
    }

    public function getCourseName() //获取课程名称
    {
        $course = $this->getCourse();
        if ($course)
        {
            return $course->name;
        }
        else
        {
            return null;
        }

    }

    public function getCourse() //获取该班级的一节课程
    {
        $course = $this->courses()->first();
        if ($course)
        {
            return $course;
        }
        else
        {
            return null;
        }

    }

//    public function getCourses() //获取该班级还在继续上的课程
//    {
//        $courses = $this->courses();
////        $courses = $this->courses()
////            ->where(function($query){
////                $query->where('edate', null)
////                    ->orwhere('edate', '>=', Carbon::now()->timestamp);
////            })
////            -> orderby('dow')
////            ->get();
//
////        $courses = $courses -> groupBy(function ($item, $key) {
////            return $item['dow'].$item['stime'].$item['sdate'];
////        } ); //分组要求班课一天不能上一节以上
//
////        $res = collect();
////        foreach ( $courses as $course )
////        {
////            $res -> push( $course->first() );
////        }
////        return $res;
//        return $courses;
//    }

//    public function getStudentCourses($sid) //获取该学生在班级里的还在继续上的课程
//    {
////        $courses = $this -> courses()
////            -> where('sid' , $sid )
////            -> where(function($query){
////                $query -> where( 'edate' , null )
////                    -> orwhere( 'edate' , '>=' , Carbon::now() -> timestamp );
////            }) -> get();
//        $courses = $this->getCourses()->where('sid', $sid)->all();
//        return $courses;
//    }

    public function getStudentLessons($sid) //获取该学生在班级里的未上单节课
    {
        $lessons = $this->lessons()
            ->where('student_id', $sid)
            ->where('status', 0)->get();
        return $lessons;
    }

//    public function getOldCourses() //获取该班级已经结束的课程
//    {
//        $courses = $this->courses()
//            -> where('edate', '<', Carbon::now()-> timestamp)
//            -> orderby('dow')
//            -> get();
////        $courses = $courses->groupBy(function ($item, $key) {
////            return $item['dow'].$item['stime'].$item['sdate'];
////        }  ); //分组要求班课一天不能上一节以上
//
////        $res = collect();
////        foreach ( $courses as $course )
////        {
////            $res -> push( $course->first() );
////        }
//        return $courses;
//    }

    public function getNextLessons() //获取该班级的下节课程（复数）
    {
        $lessons = $this->lessons()
            ->where('lesson_type' , 'bt' )
            ->where('status' , 0 )
            ->orderby('start_datetime' )
            ->get();
        return $lessons;
    }

//    public function getOldLessons() //获取该班级已经完成的单节课程
//    {
//        $lessons = $this->lessons()
//            ->where('status' , 1 )
//            ->orderby('date' , 'desc' )
//            ->orderby('etime' , 'desc' )
//            ->groupBy('syn_code')
//            ->get();
////        $lessons = $lessons -> groupBy(function ($item, $key) {
////            return $item['date'].$item['stime'];
////        } ); //分组要求班课一天不能上一节以上
//////        dd($lessons);
////        $res = collect();
////        foreach ( $lessons as $lesson )
////        {
////            $res -> push( $lesson->first() );
////        }
//        return $lessons;
//    }

    // 添加学生
    public function addStudent(Student $student)
    {
        if ($student->team) //如果学生在别的班级里，就删除他在别的班级里的课程
        {
            $student->team->deleteStudent($student);
        }
        $student->team_id = $this->id;
        $student->save(); //将学生加入班级

        //给加入学生添加目前班级的新课
        $this->copyLessonsToStudent($student);
        return true;
    }

    // 复制未上课程给学生
    public function copyLessonsToStudent(Student $student)
    {
        $lessons = $this->getNextLessons();
        $num = 0;
        foreach ( $lessons as $lesson )
        {
            $lesson->createSubLesson($student->id);
            $num++;
        }
        return $num;
    }

    //删除学生
    public function deleteStudent(Student $student)
    {
        $this->deleteLessonsFromStudent($student);
        $student->team_id = null;
        $student->save(); //将学生从班级删去
        return true;
    }

    // 删除此学生的所有本班未上课程
    public function deleteLessonsFromStudent(Student $student)
    {
        $lessons = $this->getStudentLessons($student->id);
        $num = 0;
        foreach ($lessons as $lesson)
        {
            $lesson->delete();
            $num++;
        }
        return $num;
    }

    // 获取已上外教课数
    public function getLessonCost(){
        return $this->getOldLessons()->sum(function ($group) {
            return $group->first()->waijiao_cost;
        });
    }

    // 获取KK剩余提醒的显示系数 输出0：正常 输出1：黄色（下周续费） 输出2：红色（本周续费）
    public function getKKBalance(){
        if ($this->kk_recharge < 0){ // 当kk_recharge<0时表示不显示kk续费提醒
            $oneWeek = $this->getCourses()->count();
            $left = $this->kk_recharge - $this->getLessonCost();
            if ($left <= $oneWeek)
                return 2;
            elseif ($left-$oneWeek <= $oneWeek)
                return 1;
            else
                return 0;
        }
    }

}
