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

// 登录和重置
Route::post('login', 'Api\AuthenticateController@login');
Route::post('passwordreset', 'Api\ResetPasswordController@reset')->name('password.reset');


Route::get('appdata', 'Api\AppDataController@index');

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});
//
//Route::middleware('auth:api')->get('/index', 'Api\IndexController@index');

// 微信公众号相关
Route::any('wechat', 'Api\WeChatController@serve');
Route::any('wechat/menu', 'Api\WeChatController@menu');
Route::any('wechat/list', 'Api\WeChatController@getlist');

// 线索提交
Route::post('signup', 'Api\SignUpListController@store');

Route::middleware('auth:api')->group(function () {

    Route::prefix('students')->group(function () {
        Route::get('', 'Api\StudentController@index');
        Route::get('/type/{type}', 'Api\StudentController@index');
        Route::get('{student}', 'Api\StudentController@show');
        Route::middleware('permission:student-create')->post('', 'Api\StudentController@store');
        Route::middleware('permission:student-create')->put('{student}', 'Api\StudentController@update');
        Route::middleware('permission:student-status-change')->put('/stop/{student}', 'Api\StudentController@stop');
        Route::middleware('permission:student-create')->delete('{student}', 'Api\StudentController@delete');
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
        Route::get('{team}', 'Api\TeamController@show');
        Route::middleware('permission:team-create')->post('', 'Api\TeamController@store');
        Route::middleware('permission:team-change')->put('/addstudents/{team}', 'Api\TeamController@addStudents');
        Route::middleware('permission:team-change')->put('/deletestudent/{team}', 'Api\TeamController@deleteStudent');
        Route::middleware('permission:team-change')->put('{team}', 'Api\TeamController@update');
        Route::delete('{team}', 'Api\TeamController@delete');
    });

    Route::prefix('lessons')->group(function () {
        Route::get('/index/{days}', 'Api\LessonController@index');
        Route::get('/leave', 'Api\LessonController@getLeave');
        Route::get('/confirm', 'Api\LessonController@getConfirm');
        Route::get('/copy/{lesson}', 'Api\LessonController@getCopyStudents');
        Route::post('/time-list', 'Api\LessonController@getTimeList');
        Route::get('{lesson}', 'Api\LessonController@show');
        Route::middleware('permission:lesson-create')->post('', 'Api\LessonController@store');
        Route::middleware('permission:lesson-create')->post('/team', 'Api\LessonController@createTeamLesson');
        Route::middleware('permission:lesson-create')->post('/copy/{lesson}', 'Api\LessonController@copyLesson');
        Route::middleware('permission:lesson-score-change')->put('/score/{lesson}', 'Api\LessonController@setScore');
        Route::middleware('permission:lesson-name-change')->put('/name/{lesson}', 'Api\LessonController@setName');
        Route::middleware('permission:bulesson-create')->put('/buke/{lesson}', 'Api\LessonController@buke');
        Route::middleware('permission:lesson-status-change')->put('/status/{lesson}', 'Api\LessonController@setStatus');
        Route::middleware('permission:lesson-create')->put('{lesson}', 'Api\LessonController@update');
        Route::middleware('permission:lesson-delete')->delete('{lesson}', 'Api\LessonController@delete');
    });

    Route::prefix('courses')->group(function () {
        Route::get('', 'Api\CourseController@index');
        Route::get('{course}', 'Api\CourseController@show');
        Route::middleware('permission:course-create')->post('', 'Api\CourseController@store');
        Route::middleware('permission:course-create')->put('{course}', 'Api\CourseController@update');
        Route::middleware('permission:course-delete')->delete('{course}', 'Api\CourseController@delete');
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
        Route::get('{permission}', 'Api\PermissionController@show');
        Route::middleware('permission:permission-all')->post('', 'Api\PermissionController@store');
        Route::middleware('permission:permission-all')->put('{permission}', 'Api\PermissionController@update');
        Route::middleware('permission:permission-all')->delete('{permission}', 'Api\PermissionController@delete');
    });

    Route::prefix('roles')->group(function () {
        Route::get('', 'Api\RoleController@index');
        Route::get('{role}', 'Api\RoleController@show');
        Route::middleware('permission:permission-all')->post('', 'Api\RoleController@store');
        Route::middleware('permission:permission-all')->put('/add/{role}', 'Api\RoleController@addPermissions');
        Route::middleware('permission:permission-all')->put('/remove/{role}', 'Api\RoleController@removePermissions');
        Route::middleware('permission:permission-all')->put('{role}', 'Api\RoleController@update');
        Route::middleware('permission:permission-all')->delete('{role}', 'Api\RoleController@delete');
    });

    Route::prefix('count')->group(function () {
        Route::post('/getCount', 'Api\CountController@getCount');
        Route::post('/getYearCount', 'Api\CountController@getYearCount');
    });

    Route::get('places', 'Api\PlaceController@index');
    Route::get('fteachers', 'Api\FteacherController@index');
    Route::get('agents', 'Api\UserController@getAgents');
    Route::get('cteachers', 'Api\UserController@getCteachers');
    Route::get('logout', 'Api\AuthenticateController@logout');
    Route::middleware('permission:user-email-send')->post('sendResetEmail', 'Api\UserController@sendResetEmail');
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