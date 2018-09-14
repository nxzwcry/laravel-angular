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
        // 检查改变学生状态
        $lesson = $lessonSaved->lesson;
        if ($lesson)
        {
            $student = $lesson->student;
            if ($student)
            {
                if ($student->status == 1) // 学生状态为1对1
                {
                    if (!$student->getNewLessons())
                    {
                        if (!$student->courses)
                        {
                            $student->status = 2;
                            $student->save();
                        }
                    }
                }
                elseif ($student->status == 2) // 学生状态为未排课
                {
                    if ($student->getNewLessons())
                    {
                        $student->status = 1;
                        $student->save();
                    }
                }
            }
        }
    }
}
