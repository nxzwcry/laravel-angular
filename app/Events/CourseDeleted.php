<?php

namespace App\Events;

use App\Course;
//use Illuminate\Queue\SerializesModels;

class CourseDeleted
{
//    use SerializesModels;

//    public $order;

    public $course;
    /**
     * 创建一个事件实例。
     *
     * @param  Course  $course
     * @return void
     */
    public function __construct(Course $course)
    {
        $this->course = $course;
    }
}