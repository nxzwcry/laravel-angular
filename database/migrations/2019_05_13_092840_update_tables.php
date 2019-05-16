<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // 员工、外教老师、场地的使用、不使用标志

        if (!Schema::hasColumn('users', 'active')) {
            Schema::table('users', function (Blueprint $table) {
                $table->boolean('active')->default(true);
            });
        }

        if (!Schema::hasColumn('fteachers', 'active')) {
            Schema::table('fteachers', function (Blueprint $table) {
                $table->boolean('active')->default(true);
            });
        }

        if (!Schema::hasColumn('places', 'active')) {
            Schema::table('places', function (Blueprint $table) {
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
