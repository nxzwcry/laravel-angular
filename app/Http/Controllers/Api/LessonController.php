<?php

namespace App\Http\Controllers\Api;

use Carbon\Carbon;
use App\Events\LessonSaved;
use App\Http\Resources\StudentCollection;
use App\Student;
use Illuminate\Http\Request;
use App\Lesson;
use App\Http\Resources\Lesson as LessonResource;
use App\Http\Resources\LessonCollection;

class LessonController extends ApiController
{
    // 获取待上/已上课表
    public function index($days)
    {
        if($days<>0)
        {
            if($days>0) // 获取待上课程
            {
                $lessons = Lesson::getNewLessons($days);
            }
            else{ // 获取已上课程
                $lessons = Lesson::getOldLessons(-$days);
            }
        }
        return new LessonCollection($lessons);
    }

    // 获取期间课表
    public function getTimeList(Request $request)
    {
        if ($request->stime && $request->etime)
        {
            $stime = Carbon::createFromTimeStamp($request->stime,'Asia/Shanghai');
            $etime = Carbon::createFromTimeStamp($request->etime,'Asia/Shanghai');
            return new LessonCollection(Lesson::getTimeLessonList($stime, $etime));
        }
    }

    // 获取请假列表
    public function getLeave()
    {
        return LessonResource::collection(Lesson::where('status', 3)->get()->sortBy('start_datetime')->flatten());
    }

    // 获取待确认列表
    public function getConfirm()
    {
        return LessonResource::collection(Lesson::where('status', 2)->get()->sortBy('start_datetime')->flatten());
    }

    public function show(Lesson $lesson)
    {
        return new LessonResource($lesson);
    }

    // 安排补课
    public function buke(Request $request, Lesson $lesson)
    {
        if ($request->cteacher_id)
        {
            $res = $lesson->createBuke($request->all());
        }
        $lesson->setBuke();
        $lesson->save();
        return new LessonResource($res);
    }

    public function store(Request $request)
    {
        $lesson = Lesson::create($request->all());

        return new LessonResource($lesson);
    }

    // 创建班课
    public function createTeamLesson(Request $request)
    {
        $lesson = Lesson::createTeamLesson($request->all());

        return new LessonResource($lesson);
    }

    // 设置状态（非批量更新字段）
    public function setStatus(Request $request, Lesson $lesson)
    {
        if ($request->status)
        {
            if ($request->status == 3)
            {
                $lesson->setLeave();
            }
            elseif ($lesson->status == 2)
            {
                $lesson->setFinish();
            }
            else
            {
                $lesson->status = $request->status;
            }
            $lesson->save();
        }
        return new LessonResource($lesson);

    }

    // 设置分数（非批量更新字段）
    public function setScore(Request $request, Lesson $lesson)
    {
        if($request->score)
        {
            $lesson->score = $request->score;
            $lesson->save();
        }
        return new LessonResource($lesson);
    }

    // 设置名称
    public function setName(Request $request, Lesson $lesson)
    {
        if($request->name)
        {
            if ($lesson->lesson_type == 'bt')
            {
                $lesson->updateTeamLesson(['name' => $request->name]);
            }
            else
            {
                $lesson->name = $request->name;
                $lesson->save();
            }
        }
        return new LessonResource($lesson);
    }

    public function update(Request $request, Lesson $lesson)
    {
        if ($lesson->lesson_type == 'bt')
        {
            $lesson->updateTeamLesson($request->all());
        }
        else
        {
            // 单独更新课程状态（非批量更新字段）
            $lesson->update($request->all());
            if ($request->status <> $lesson->status)
            {
                $lesson->status = $request->status;
                $lesson->save();
            }
        }

        return new LessonResource($lesson);
    }

    public function delete(Lesson $lesson)
    {
        if($lesson->lesson_type == 'bt')
        {
            $lesson->deleteTeamLesson();
        }
        $lesson->delete();

        return response()->json(null, 204);
    }

    // 获取此课程可以复制给的学生
    public function getCopyStudents(Lesson $lesson)
    {
        $students = collect();
        // 精品课可以复制给所有未停课学生
        if ($lesson->lesson_type == 'j')
        {
            $students = Student::where('status', '>=', 0)->get();
        }
        // 班课可以复制给同班的且没有此课程的学生
        elseif ($lesson->lesson_type == 'b')
        {
            $students = $lesson->team->students;
            foreach ($students as $key => $item) {
                if ($item->lessons()->where('syn_code', $lesson->syn_code)->first())
                {
                    $students->pull($key);
                }
            }
            $students = $students->flatten();
        }
        return new StudentCollection($students);
    }

    // 复制课程给某个学生
    public function copyLesson(Request $request, Lesson $lesson)
    {
        $students = $request->students;
        if ($students)
        {
            foreach ($students as $item)
            {
                $lesson->copyToStudent($item);
            }
        }
    }
}
