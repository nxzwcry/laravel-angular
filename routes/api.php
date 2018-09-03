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
Route::get('appdata', 'Api\AppDataController@index');
Route::post('passwordreset', 'Api\ResetPasswordController@reset')->name('password.reset');

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});
//
//Route::middleware('auth:api')->get('/index', 'Api\IndexController@index');

Route::middleware('auth:api')->group(function () {

    Route::prefix('students')->group(function () {
        Route::get('', 'Api\StudentController@index');
        Route::get('{student}', 'Api\StudentController@show');
//        Route::prefix('recharges')->group(function () {
//            Route::get('{student}', 'Api\StudentController@getRechargeList');
//        });
        Route::post('', 'Api\StudentController@store');
        Route::put('{student}', 'Api\StudentController@update');
        Route::delete('{student}', 'Api\StudentController@delete');
    });

    Route::prefix('users')->group(function () {
        Route::get('', 'Api\UserController@index');
        Route::get('{user}', 'Api\UserController@show');
        Route::post('', 'Api\UserController@store');
        Route::put('{user}', 'Api\UserController@update');
        Route::delete('{user}', 'Api\UserController@delete');
    });

    Route::prefix('teams')->group(function () {
        Route::get('', 'Api\TeamController@index');
        Route::get('{Team}', 'Api\TeamController@show');
        Route::post('', 'Api\TeamController@store');
        Route::put('{Team}', 'Api\TeamController@update');
        Route::delete('{Team}', 'Api\TeamController@delete');
    });

    Route::prefix('lessons')->group(function () {
        Route::get('', 'Api\LessonController@index');
        Route::get('{Lesson}', 'Api\LessonController@show');
        Route::post('', 'Api\LessonController@store');
        Route::put('{Lesson}', 'Api\LessonController@update');
        Route::delete('{Lesson}', 'Api\LessonController@delete');
    });

    Route::prefix('courses')->group(function () {
        Route::get('', 'Api\CourseController@index');
        Route::get('{Course}', 'Api\CourseController@show');
        Route::post('', 'Api\CourseController@store');
        Route::put('{Course}', 'Api\CourseController@update');
        Route::delete('{Course}', 'Api\CourseController@delete');
    });

    Route::prefix('recharges')->group(function () {
        Route::get('', 'Api\RechargeController@index');
        Route::get('{student}', 'Api\RechargeController@list');
        Route::middleware('permission:recharge-create')->post('', 'Api\RechargeController@store');
        Route::middleware('permission:recharge-create')->put('{recharge}', 'Api\RechargeController@update');
        Route::middleware('permission:recharge-create')->delete('{recharge}', 'Api\RechargeController@delete');
    });

    Route::prefix('permissions')->group(function () {
        Route::get('', 'Api\PermissionController@index');
        Route::get('{Permission}', 'Api\PermissionController@show');
        Route::post('', 'Api\PermissionController@store');
        Route::put('{Permission}', 'Api\PermissionController@update');
        Route::delete('{Permission}', 'Api\PermissionController@delete');
    });

    Route::prefix('roles')->group(function () {
        Route::get('', 'Api\RoleController@index');
        Route::get('{id}', 'Api\RoleController@show');
        Route::post('', 'Api\RoleController@store');
        Route::put('{id}', 'Api\RoleController@update');
        Route::put('/add/{id}', 'Api\RoleController@addPermissions');
        Route::put('/remove/{id}', 'Api\RoleController@removePermissions');
        Route::delete('{id}', 'Api\RoleController@delete');
    });

    Route::get('places', 'Api\PlaceController@index');
    Route::get('fteachers', 'Api\FteacherController@index');
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