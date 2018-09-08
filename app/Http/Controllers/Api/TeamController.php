<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Team;
use App\Http\Resources\Team as TeamResource;
use App\Http\Resources\TeamCollection;

class TeamController extends ApiController
{
    public function index()
    {
        return new TeamCollection(Team::all());
    }

    public function show(Team $team)
    {
        return new TeamResource($team);
    }

    public function store(Request $request)
    {
        $team = Team::create($request->all());

        return response()->json($team, 201);
    }

    public function addStudents(Request $request, Team $team)
    {
        $team->addStudents($request->students);

        return response()->json($team, 200);
    }


    public function update(Request $request, Team $team)
    {
        $team->update($request->all());

        return response()->json($team, 200);
    }

    public function delete(Team $team)
    {
        $team->delete();

        return response()->json(null, 204);
    }
}
