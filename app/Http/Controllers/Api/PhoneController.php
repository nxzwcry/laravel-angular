<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Phone;

class PhoneController extends ApiController
{
    public function index()
    {
        return PlaceResource::collection(Place::where('active', true)->get());
    }

    public function delete(Phone $phone)
    {
        $phone->delete();

        return response()->json(null, 204);
    }

}
