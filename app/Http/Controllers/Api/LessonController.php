<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Lesson;
use App\Http\Resources\Lesson as LessonResource;
use App\Http\Resources\LessonCollection;

class LessonController extends ApiController
{
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

    public function getLeave()
    {
        return LessonResource::collection(Lesson::where('status', 3)->get());
    }

    public function show(Lesson $lesson)
    {
        return new LessonResource($lesson);
    }

    public function buke(Request $request, Lesson $lesson)
    {
        if ($request->cteacher)
        {
            $res = $lesson->createBuke($request->all());
        }
        $lesson->setBuke();
        $lesson->save();
        return new LessonResource($lesson);
    }

    public function store(Request $request)
    {
        $lesson = Lesson::create($request->all());

        return new LessonResource($lesson);
    }

    public function createTeamLesson(Request $request)
    {
        $lesson = Lesson::createTeamLesson($request->all());

        return new LessonResource($lesson);
    }

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

    public function setScore(Request $request, Lesson $lesson)
    {
        if($request->score)
        {
            $lesson->score = $request->score;
            $lesson->save();
        }
        return new LessonResource($lesson);
    }

    public function setName(Request $request, Lesson $lesson)
    {
        if($request->name)
        {
            $lesson->name = $request->name;
            $lesson->save();
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
            if ($request->status)
            {
                $lesson->status = $request->status;
                $lesson->save();
            }
            $lesson->update($request->all());
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
}
