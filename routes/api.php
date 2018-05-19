<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:api')->get('/index', 'Api\IndexController@index');

Route::get('students', 'Api\StudentController@index');
Route::get('students/{student}', 'Api\StudentController@show');
Route::post('students', 'StudentController@store');
Route::put('students/{student}', 'StudentController@update');
Route::delete('students/{student}', 'StudentController@delete');