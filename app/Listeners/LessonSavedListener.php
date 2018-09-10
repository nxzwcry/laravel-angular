<?php

namespace App\Listeners;

use App\Events\LessonSaved;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class LessonSavedListener
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
    public function handle(LessonSaved $lessonSaved)
    {
        //
    }
}
