<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\CourseCollection;
use Illuminate\Http\Request;
use App\Course;
use App\Http\Resources\Course as CourseResource;

class CourseController extends ApiController
{
    public function index()
    {
        return new CourseCollection(Course::all());
    }

    public function show(Course $course)
    {
        return new CourseResource($course);
    }

    public function store(Request $request)
    {
        $course = Course::create($request->all());

        return new CourseResource($course);
    }

    public function update(Request $request, Course $course)
    {
        $course->update($request->all());

        return new CourseResource($course);
    }

    public function delete(Course $course)
    {
        $course->delete();

        return response()->json(null, 204);
    }
}
