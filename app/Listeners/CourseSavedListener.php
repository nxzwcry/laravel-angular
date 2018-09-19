<?php

namespace App\Listeners;

use App\Events\CourseSaved;
use Carbon\Carbon;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class CourseSavedListener
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
     * @param  LessonSaved  $event
     * @return void
     */
    public function handle(CourseSaved $courseSaved)
    {
        //
        $course = $courseSaved->course;
        $course->createMonthLessons();
        $now = Carbon::now('Asia/Shanghai');
        if ($now->day >= 21) // 每月21日0点创建下月课程
        {
            $month =$now->month+1;
            $course->createMonthLessons($month);
        }
    }
}
