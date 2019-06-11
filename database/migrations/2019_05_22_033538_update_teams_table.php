<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateTeamsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // 增加班号列

        if (!Schema::hasColumn('teams', 'num')) {
            Schema::table('teams', function (Blueprint $table) {
                $table->integer('num')->default(0);
            });
        }

        // 班级的不使用标志

        if (!Schema::hasColumn('teams', 'active')) {
            Schema::table('teams', function (Blueprint $table) {
                $table->boolean('active')->default(true);
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
        //
    }
}
