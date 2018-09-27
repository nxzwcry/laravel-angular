<?php

namespace App\Listeners;

use App\Events\LessonSaving;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Log;

class LessonSavingListener
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
     * @param  LessonSaving  $event
     * @return void
     */
    public function handle(LessonSaving $lessonSaving)
    {
        $lesson = $lessonSaving->lesson;
        $lesson->chackAndSetStatus();
    }
}
