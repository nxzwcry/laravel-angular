<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Carbon\Carbon;

class CreateWechatMessageTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // 增加学生上课环境列
        if (!Schema::hasColumn('students', 'env')) {

            Schema::table('students', function (Blueprint $table) {
                $table->Integer('env')->default(1);  // 1:米乐英语APP 2：Zoom
            });

        }

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // 删除学生上课环境列
        if (Schema::hasColumn('students', 'env')) {
            Schema::table('students', function (Blueprint $table) {
                $table->dropColumn('env');
            });
        }
    }
}
