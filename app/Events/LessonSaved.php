<?php

namespace App\Events;

use App\Lesson;
//use Illuminate\Queue\SerializesModels;

class LessonSaved
{
//    use SerializesModels;

//    public $order;

    public $lesson;
    /**
     * 创建一个事件实例。
     *
     * @param  Lesson  $lesson
     * @return void
     */
    public function __construct(Lesson $lesson)
    {
        $this->lesson = $lesson;
    }
}