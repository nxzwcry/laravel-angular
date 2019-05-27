<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\Fteacher as FteacherResource;
use Illuminate\Http\Request;
use App\Fteacher;
use Illuminate\Support\Facades\Validator;

class FteacherController extends ApiController
{
    public function index()
    {
        return FteacherResource::collection(Fteacher::where('active', true)->get());
    }

    public function search(Request $request)
    {
        if ($request->searchWord)
        {
            return FteacherResource::collection(Fteacher::where('active', true)->where('name','like','%'.$request->searchWord.'%')->get());
        }
        return $this->message("搜索值为空");
    }

    public function show(Fteacher $fteacher)
    {
        return new FteacherResource($fteacher);
    }

    public function store(Request $request)
    {
        $this->validator($request->all())->validate();
        $fteacher = Fteacher::create($request->all());

        return response()->json(new FteacherResource($fteacher), 201);
    }

    public function update(Request $request, Fteacher $fteacher)
    {
        $fteacher->update($request->all());
        return response()->json(new FteacherResource($fteacher), 200);
    }

    public function delete(Fteacher $fteacher)
    {
        $fteacher->deactive();

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
            'name' => 'required|string|max:255',
            'mid' => 'required|string|max:255',
        ]);
    }

}
