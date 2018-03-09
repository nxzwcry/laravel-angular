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
            $table->string('ename');
            $table->unsignedInteger('sex');
            $table->date('birthday');
            $table->unsignedInteger('grade-birthday');
            $table->unsignedInteger('agent_user_id');
            $table->unsignedInteger('cteacher_user_id');
            $table->string('email');
            $table->unsignedInteger('team_id');
            $table->Integer('kk_value');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('teams', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->Integer('kk_recharge');
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
            $table->Integer('money');
            $table->unsignedInteger('student_id');
            $table->longText('note');
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

        Schema::create('massages', function (Blueprint $table) {
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
            $table->unsignedInteger('student_id');
            $table->unsignedInteger('cteacher_id');
            $table->unsignedInteger('fteacher_id');
            $table->string('name');
            $table->dateTime('start_datetime');
            $table->dateTime('end_datetime');
            $table->unsignedInteger('video_id');
            $table->unsignedInteger('report_id');
            $table->unsignedInteger('file_id');
            $table->morphs('courseware');
            $table->Integer('waijiao_cost');
            $table->Integer('zhongjiao_cost');
            $table->Integer('jingpin_cost');
            $table->string('lesson_type');
            $table->Integer('score');
            $table->unsignedInteger('team_id');
            $table->unsignedInteger('place_id');
            $table->unsignedInteger('status');
            $table->longText('note');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('courses', function (Blueprint $table) {
            $table->increments('id');
            $table->string('lesson_type');
            $table->unsignedInteger('student_or_team_id');
            $table->unsignedInteger('cteacher_id');
            $table->unsignedInteger('fteacher_id');
            $table->string('name');
            $table->Integer('dow');
            $table->time('start_time');
            $table->time('end_time');
            $table->morphs('courseware');
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
            $table->longText('sum_en');
            $table->longText('sum_zh');
            $table->longText('desc_en');
            $table->longText('desc_zh');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('files', function (Blueprint $table) {
            $table->increments('id');
            $table->string('type');
            $table->string('url');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('courseware_teams', function (Blueprint $table) {
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
            $table->longText('desc_en');
            $table->longText('desc_zh');
            $table->unsignedInteger('sex');
            $table->unsignedInteger('preschool');
            $table->unsignedInteger('grade1-3');
            $table->unsignedInteger('grade4-6');
            $table->unsignedInteger('englis_america');
            $table->longText('teaching_style');
            $table->longText('note');
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
        Schema::dropIfExists('teams');
        Schema::dropIfExists('places');
        Schema::dropIfExists('recharges');
        Schema::dropIfExists('phones');
        Schema::dropIfExists('wechats');
        Schema::dropIfExists('massages');
        Schema::dropIfExists('lessons');
        Schema::dropIfExists('courses');
        Schema::dropIfExists('videos');
        Schema::dropIfExists('reports');
        Schema::dropIfExists('files');
        Schema::dropIfExists('courseware_teams');
        Schema::dropIfExists('fteachers');
    }
}
