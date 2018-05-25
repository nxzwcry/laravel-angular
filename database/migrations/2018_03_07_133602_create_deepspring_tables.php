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
            $table->date('birthday')->nullable($value = true);
            $table->Integer('grade')->nullable($value = true); // 6表示一年级
            $table->unsignedInteger('agent_user_id')->nullable($value = true);
            $table->unsignedInteger('cteacher_user_id')->nullable($value = true);
            $table->string('email')->nullable($value = true);
            $table->string('address')->nullable($value = true);
            $table->unsignedInteger('team_id')->nullable($value = true);
            $table->Integer('kk_value')->default(1); // 1表示不适用 正常情况下小于等于0
            $table->longText('desc')->nullable($value = true);
            $table->timestamps();
            $table->softDeletes();
        });

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
            $table->Integer('kk_recharge'); // 班课充值数
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
            $table->Integer('waijiao');
            $table->Integer('zhongjiao');
            $table->Integer('jingpin');
            $table->Integer('leave');
            $table->Integer('money');
            $table->unsignedInteger('student_id');
            $table->unsignedInteger('user_id');
            $table->longText('note')->nullable($value = true);
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('phones', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('phonen_number');
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
            $table->unsignedInteger('student_id')->nullable($value = true);
            $table->unsignedInteger('cteacher_id')->nullable($value = true);
            $table->unsignedInteger('fteacher_id')->nullable($value = true);
            $table->string('name')->nullable($value = true);
            $table->dateTime('start_datetime');
            $table->dateTime('end_datetime');
            $table->unsignedInteger('video_id')->nullable($value = true);
            $table->unsignedInteger('report_id')->nullable($value = true);
            $table->unsignedInteger('file_id')->nullable($value = true);
            $table->unsignedInteger('courseware_id')->nullable($value = true);
            $table->Integer('waijiao_cost');
            $table->Integer('zhongjiao_cost');
            $table->Integer('jingpin_cost');
            $table->string('lesson_type');  // w：外教课 b：班课 f：复习课 J：精品课 bu：补课 s：试听
            $table->Integer('score');
            $table->unsignedInteger('team_id')->nullable($value = true);
            $table->unsignedInteger('syn_code')->nullable($value = true);
            $table->unsignedInteger('place_id');
            $table->unsignedInteger('status');
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
            $table->Integer('dow');
            $table->time('start_time');
            $table->time('end_time');
            $table->unsignedInteger('courseware_id')->nullable($value = true);
            $table->Integer('waijiao_cost');
            $table->Integer('zhongjiao_cost');
            $table->Integer('jingpin_cost');
            $table->unsignedInteger('place_id');
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
