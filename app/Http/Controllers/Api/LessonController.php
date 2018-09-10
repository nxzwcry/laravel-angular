<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Lesson;
use App\Http\Resources\Lesson as LessonResource;
use App\Http\Resources\LessonCollection;

class LessonController extends ApiController
{
    public function index()
    {
        return new LessonCollection(Lesson::all());;
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
        $lesson->update($request->all());

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

    public function leave(Lesson $lesson)
    {
        $lesson->delete();

        return response()->json(null, 200);
    }
}
