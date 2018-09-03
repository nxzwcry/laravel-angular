<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\Fteacher as FteacherResource;
use Illuminate\Http\Request;
use App\Fteacher;

class FteacherController extends ApiController
{
    public function index()
    {
        return FteacherResource::collection(Fteacher::all());
    }
}
