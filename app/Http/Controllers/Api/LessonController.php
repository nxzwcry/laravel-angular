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

    public function store(Request $request)
    {
        $lesson = Lesson::create($request->all());

        return response()->json($lesson, 201);
    }

    public function createTeamLesson(Request $request)
    {
        $lesson = Lesson::createTeamLesson($request->all());

        return response()->json($lesson, 201);
    }

    public function update(Request $request, Lesson $lesson)
    {
        if ($lesson->lesson_type == 'bt')
        {
            $lesson->updateTeamLesson($request->all());
        }
        else
        {
            $lesson->update($request->all());
        }

        return response()->json($lesson, 200);
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

    public function confirm(Lesson $lesson)
    {
        if ($lesson->status == 2)
        {
            $lesson->setFinish();
            $lesson->save();
        }
    }

    public function leave(Lesson $lesson)
    {
        $lesson->leave();

        return response()->json(null, 200);
    }
}
