<?php

namespace App\Listeners;

use App\Events\CourseSaved;
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
        $courseSaved->course->createMonthLessons();
    }
}
