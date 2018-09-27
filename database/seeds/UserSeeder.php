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
        factory(\App\User::class)->create([
            'name' => '陈如意',
            'email' => 'cry@deepspring.cn',
            'password' => '$2y$10$70mMUO6AGj1PaBgsiS9JqOkwLAxq7tRtzEqwK2rYqetLvpp9RcIwa',
        ]);
    }
}
