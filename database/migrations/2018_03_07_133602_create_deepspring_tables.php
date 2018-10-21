<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDeepspringTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('students', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('ename')->nullable($value = true);
            $table->unsignedInteger('sex')->nullable($value = true); // 1:男 2:女
            $table->timestamp('birthday')->nullable($value = true);
            $table->Integer('grade')->nullable($value = true); // 6表示一年级
            $table->unsignedInteger('agent_user_id')->nullable($value = true);
            $table->unsignedInteger('cteacher_user_id')->nullable($value = true);
            $table->string('email')->nullable($value = true);
            $table->string('address')->nullable($value = true);
            $table->unsignedInteger('team_id')->nullable($value = true);
//            $table->Integer('kk_value')->default(1); // 1表示不适用 正常情况下小于等于0
            $table->longText('desc')->nullable($value = true);
            $table->Integer('status')->default(2);  // 0：班课 1:1对1 2：停课（未排课） -1:试听 -2：停课（不续课）
            $table->timestamps();
            $table->softDeletes();
        });

        // 提醒机制
        Schema::create('student_values', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('student_id')->unique();
            $table->Integer('fuxi')->nullable($value = true);
            $table->Integer('jingpin')->nullable($value = true);
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('teams', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->unsignedInteger('cteacher_user_id')->nullable($value = true);
            $table->unsignedInteger('place_id')->nullable($value = true);
            $table->Integer('kk_recharge')->nullable($value = true); // 班课充值数
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('places', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('recharges', function (Blueprint $table) {
            $table->increments('id');
            $table->Integer('waijiao')->default(0);
            $table->Integer('zhongjiao')->default(0);
            $table->Integer('jingpin')->default(0);
            $table->Integer('money')->default(0);
            $table->unsignedInteger('student_id');
            $table->unsignedInteger('user_id');
            $table->longText('note')->nullable($value = true);
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('phones', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('phone_number');
            $table->unsignedInteger('student_id');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('wechats', function (Blueprint $table) {
            $table->increments('id');
            $table->string('openid');
            $table->unsignedInteger('student_id');
            $table->string('name');
            $table->string('nickname');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('messages', function (Blueprint $table) {
            $table->increments('id');
            $table->string('massage_type');
            $table->unsignedInteger('to_id');
            $table->unsignedInteger('student_id');
            $table->dateTime('send_time');
            $table->longText('massage');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('lessons', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('course_id')->nullable($value = true);
            $table->unsignedInteger('student_id')->nullable($value = true);
            $table->unsignedInteger('cteacher_id')->nullable($value = true);
            $table->unsignedInteger('fteacher_id')->nullable($value = true);
            $table->string('name')->nullable($value = true);
            $table->timestamp('start_datetime');
            $table->timestamp('end_datetime');
            $table->timestamp('fteacher_datetime')->nullable($value = true);
            $table->unsignedInteger('video_id')->nullable($value = true);
            $table->unsignedInteger('report_id')->nullable($value = true);
            $table->unsignedInteger('file_id')->nullable($value = true);
            $table->unsignedInteger('courseware_id')->nullable($value = true);
            $table->Float('waijiao_cost')->default(0);
            $table->Float('zhongjiao_cost')->default(0);
            $table->Float('jingpin_cost')->default(0);
            $table->string('lesson_type');  // w：外教课 b：班课 f：复习课 j：精品课 bu：补课 s：试听 bt：班课显示课
            $table->Integer('score')->default(0);
            $table->unsignedInteger('team_id')->nullable($value = true);
            $table->unsignedInteger('syn_code')->nullable($value = true);
            $table->unsignedInteger('place_id')->default(1);
            $table->Integer('status')->default(0);  // 0：未上 1:已上 2:待确认 3:请假(未补) 4:请假(已补) 5:旷课
            $table->longText('note')->nullable($value = true);
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('courses', function (Blueprint $table) {
            $table->increments('id');
            $table->string('lesson_type');
            $table->unsignedInteger('student_id')->nullable($value = true);
            $table->unsignedInteger('team_id')->nullable($value = true);
            $table->unsignedInteger('cteacher_id')->nullable($value = true);
            $table->unsignedInteger('fteacher_id')->nullable($value = true);
            $table->string('name')->nullable($value = true);
            $table->string('dow'); //0:周日
            $table->timestamp('start_time');
            $table->timestamp('end_time');
            $table->timestamp('fteacher_time')->nullable($value = true);
            $table->unsignedInteger('courseware_id')->nullable($value = true);
            $table->Float('waijiao_cost')->default(0);
            $table->Float('zhongjiao_cost')->default(0);
            $table->Float('jingpin_cost')->default(0);
            $table->unsignedInteger('place_id')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('videos', function (Blueprint $table) {
            $table->increments('id');
            $table->string('url_type');
            $table->string('url');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('reports', function (Blueprint $table) {
            $table->increments('id');
            $table->Integer('fayin_stars');
            $table->Integer('canyudu_stars');
            $table->Integer('lijieli_stars');
            $table->Integer('liuchangdu_stars');
            $table->Integer('chuangzaoli_stars');
            $table->longText('sum_en')->nullable($value = true);
            $table->longText('sum_zh')->nullable($value = true);
            $table->longText('desc_en')->nullable($value = true);
            $table->longText('desc_zh')->nullable($value = true);
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('files', function (Blueprint $table) {
            $table->increments('id');
            $table->string('type'); // 本地url、阿里云url等
            $table->string('url');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('coursewares', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('url');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('fteachers', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('mid');
            $table->longText('desc_en')->nullable($value = true);
            $table->longText('desc_zh')->nullable($value = true);
            $table->unsignedInteger('sex')->nullable($value = true);
            $table->unsignedInteger('preschool')->nullable($value = true);
            $table->unsignedInteger('grade1-3')->nullable($value = true);
            $table->unsignedInteger('grade4-6')->nullable($value = true);
            $table->unsignedInteger('english_america')->nullable($value = true);
            $table->longText('teaching_style')->nullable($value = true);
            $table->longText('note')->nullable($value = true);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('students');
        Schema::dropIfExists('student_values');
        Schema::dropIfExists('teams');
        Schema::dropIfExists('places');
        Schema::dropIfExists('recharges');
        Schema::dropIfExists('phones');
        Schema::dropIfExists('wechats');
        Schema::dropIfExists('messages');
        Schema::dropIfExists('lessons');
        Schema::dropIfExists('courses');
        Schema::dropIfExists('videos');
        Schema::dropIfExists('reports');
        Schema::dropIfExists('files');
        Schema::dropIfExists('coursewares');
        Schema::dropIfExists('fteachers');
    }
}
