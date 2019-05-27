<?php

namespace App\Http\Controllers\Api;

use App\Lesson;
use Illuminate\Http\Request;
use App\Video;
use App\Http\Resources\Video as VideoResource;
use Illuminate\Support\Facades\Validator;

class VideoController extends ApiController
{
    public function show(Video $video)
    {
        return new VideoResource($video);
    }

    public function store(Request $request, Lesson $lesson)
    {
        $this->validator($request->all())->validate();
//        $lesson = Lesson::find($request->lessonId);
        $video = Video::create([
            'url_type' => $request->url_type,
            'url' => $request->url,
        ]);
        if ($lesson->lesson_type == 'bt')
        {
            $lesson->updateTeamLesson(['video_id' => $video->id]);
        }
        else
        {
            $lesson->video_id = $video->id;
            $lesson->save();
        }
        return new VideoResource($video);
    }

    public function update(Request $request, Video $video)
    {
        $url = $request->url;
        if ($url && $video)
        {
            $video->url_type = $request->url_type;
            $video->url = $url;
            $video->save();
        }

        return new VideoResource($video);
    }

    public function delete(Lesson $lesson)
    {
        if ($lesson->lesson_type == 'bt')
        {
            $lesson->updateTeamLesson(['video_id' => null]);
        }
        else
        {
            $lesson->id = null;
            $lesson->save();
        }

        return response()->json(null, 204);
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'url' => 'required|string|max:255',
            'url_type' => 'required|string|max:255',
//            'lessonId' => 'required|exists:lessons,id',
        ]);
    }

}
