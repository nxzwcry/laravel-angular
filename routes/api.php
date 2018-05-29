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
Route::post('students', 'Api\StudentController@store');
Route::put('students/{student}', 'Api\StudentController@update');
Route::delete('students/{student}', 'Api\StudentController@delete');

Route::get('users', 'Api\UserController@index');
Route::get('users/{user}', 'Api\UserController@show');
Route::post('users', 'StudentController@store');
Route::put('users/{user}', 'StudentController@update');
Route::delete('users/{user}', 'StudentController@delete');
Route::get('agents', 'Api\UserController@getAgents');
Route::get('cteachers', 'Api\UserController@getCteachers');