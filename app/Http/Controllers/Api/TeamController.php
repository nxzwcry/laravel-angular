<?php

namespace App\Http\Controllers\Api;

use App\Student;
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

        return new TeamResource($team);
    }

    public function addStudents(Request $request, Team $team)
    {
        $team->addStudents($request->students);

        return new TeamResource($team);
    }

    public function deleteStudent(Request $request, Team $team)
    {
        $student = Student::find($request->student);
        if ($student)
        {
            $team->deleteStudent($student);
            return new TeamResource($team);
        }
        else
        {
            return response()->json(false, 200);
        }
    }

    public function update(Request $request, Team $team)
    {
        $team->update($request->all());

        return new TeamResource($team);
    }

    public function delete(Team $team)
    {
        $team->delete();

        return response()->json(null, 204);
    }
}
