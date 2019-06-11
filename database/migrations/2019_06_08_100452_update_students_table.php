<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Carbon\Carbon;

class UpdateStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // 增加学生不续费时间列
        if (!Schema::hasColumn('students', 'stop_time')) {
            Schema::table('students', function (Blueprint $table) {
                $default = Carbon::createFromDate(2019, 3, 30);
                $table->timestamp('stop_time')->default($default);
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
        // 删除学生不续费时间列
        if (Schema::hasColumn('students', 'stop_time')) {
            Schema::table('students', function (Blueprint $table) {
                $table->dropColumn('stop_time');
            });
        }
    }
}
