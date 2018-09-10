<?php

namespace App\Listeners;

use App\Events\LessonSaving;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

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
        // 判断课程是否在保存时从未上可以变为已上或者待确认
        if ($lesson->status == 0)
        {
            if ($lesson->isTimeOut())
            {
                // 外教课和精品课、班课显示课过期后直接变为已上
                if ($lesson->lesson_type == 'w' || $lesson->lesson_type == 'j' || $lesson->lesson_type == 'bt')
                {
                    $lesson->setFinish();
                }
                // 班课、中教课和补课过期后变为待确认
                else {
                    $lesson->setConfirm();
                }
            }
        }
        // 判断课程是否在保存时从已上或者待确认可以变为未上
        elseif($lesson->status == 1 || $lesson->status == 2)
        {
            if (!$lesson->isTimeOut())
            {
                $lesson->setNew();
            }
        }
    }
}
