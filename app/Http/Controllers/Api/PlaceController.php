<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\Place as PlaceResource;
use Illuminate\Http\Request;
use App\Place;

class PlaceController extends ApiController
{
    public function index()
    {
        return PlaceResource::collection(Place::all());
    }
}
