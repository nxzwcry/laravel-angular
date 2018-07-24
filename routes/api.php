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

Route::post('login', 'Api\AuthenticateController@login');
Route::post('passwordreset', 'Api\ResetPasswordController@reset')->name('password.reset');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:api')->get('/index', 'Api\IndexController@index');

Route::middleware('auth:api')->group(function () {

    Route::prefix('students')->group(function () {
        Route::get('', 'Api\StudentController@index');
        Route::get('{student}', 'Api\StudentController@show');
        Route::post('', 'Api\StudentController@store');
        Route::put('{student}', 'Api\StudentController@update');
        Route::delete('{student}', 'Api\StudentController@delete');
    });

    Route::prefix('users')->group(function () {
        Route::get('', 'Api\UserController@index');
        Route::get('{user}', 'Api\UserController@store');
        Route::post('', 'Api\UserController@store');
        Route::put('{user}', 'UserController@update');
        Route::delete('{user}', 'UserController@delete');
    });

    Route::prefix('teams')->group(function () {
        Route::get('', 'Api\TeamController@index');
        Route::get('{Team}', 'Api\TeamController@store');
        Route::post('', 'Api\TeamController@store');
        Route::put('{Team}', 'TeamController@update');
        Route::delete('{Team}', 'TeamController@delete');
    });

    Route::get('agents', 'Api\UserController@getAgents');
    Route::get('cteachers', 'Api\UserController@getCteachers');
    Route::get('logout', 'Api\AuthenticateController@logout');
    Route::post('sendResetEmail', 'Api\UserController@sendResetEmail');
});


//test
//Route::get('email', function(){
//    $data = [
//        'url'  => 'https://laravel.com',
//        'name' => 'laravel'
//    ];
//
//    Mail::send('emails.register', $data, function ($message) {
//        $message->from('test@push.deepspring.cn', 'Deepspring');
//        $message->to('cry@deepspring.cn');
//        $message->subject('Hello World');
//    });
//});