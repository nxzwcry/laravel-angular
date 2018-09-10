<?php

namespace App\Listeners;

use App\Events\LessonCreating;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class LessonCreatingListener
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
     * @param  LessonCreating  $event
     * @return void
     */
    public function handle(LessonCreating $lessonCreating)
    {
        //
        if ($lessonCreating->lesson->isTimeOut())
        {
            if ($lessonCreating->lesson->status == 0)
            {
                $lessonCreating->lesson->setFinish();
            }
        }
    }
}
