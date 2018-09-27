<?php

use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        factory(Spatie\Permission\Models\Permission::class)->create([
            'name' => 'permission-all',
            'cn_name' => '权限管理',
        ]);
    }
}
