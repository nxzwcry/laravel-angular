<?php

namespace App\Listeners;

use App\Events\LessonDeleted;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Log;

class LessonDeletedListener
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
     * @param  LessonDeleted  $event
     * @return void
     */
    public function handle(LessonDeleted $lessonDeleted)
    {
        // 检查改变学生状态
        $lesson = $lessonDeleted->lesson;
        if ($lesson)
        {
            $student = $lesson->student;
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
