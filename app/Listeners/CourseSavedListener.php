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
        $course = $courseSaved->course;

        // 固定课程首次被创建时，创建本月课程
        $course->createMonthLessons();

        // 如果创建固定课程的时间在当月的21日0点之后，创建下月课程
        $now = Carbon::now('Asia/Shanghai');
        if ($now->day >= 21) // 每月21日0点创建下月课程
        {
            $month =$now->month+1;
            $course->createMonthLessons($month);
        }
    }
}
