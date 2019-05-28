<?php

namespace App\Listeners;

use App\Events\CourseDeleted;
use Carbon\Carbon;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class CourseDeletedListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  CourseDeleted  $event
     * @return void
     */
    public function handle(CourseDeleted $courseSaved)
    {
        $course = $courseSaved->course;

        // 检查改变学生状态
        if ($course)
        {
            $student = $course->student;
            if ($student)
            {
                if ($student->status == 1) // 学生状态为1对1
                {
                    if (!$student->getNewLessons())
                    {
                        if (!$student->courses->first())
                        {
                            $student->status = 2;
                            $student->save();
                        }
                    }
                }
            }
        }
    }
}
