<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Course;
use App\Http\Resources\Course as CourseResource;

class CourseController extends ApiController
{
    public function index()
    {
        return CourseResource::collection(Course::all());
    }

    public function show(Course $course)
    {
        return new CourseResource($course);
    }

    public function store(Request $request)
    {
        $course = Course::create($request->all());

        return response()->json($course, 201);
    }

    public function update(Request $request, Course $course)
    {
        $course->update($request->all());

        return response()->json($course, 200);
    }

    public function delete(Course $course)
    {
        $course->delete();

        return response()->json(null, 204);
    }
}
