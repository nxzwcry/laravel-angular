<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Carbon\Carbon;
use Log;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        // 微信发送上课提醒
        \App\Console\Commands\SendStartMassage::class,
        // 处理完课
        \App\Console\Commands\AfterClass::class,
        // 增加学生年级
        \App\Console\Commands\AddGrade::class,
    ];

    protected $gradeupdatedate = '2017-9-1 00:00:00.000000'; // 更新年级的时间

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // 时间为UTC时间
        // $schedule->command('inspire')
        //          ->hourly();
//        $schedule->command('AfterClass')->dailyAt('10:10');// 每天10:00运行一次...
//        $schedule->command('AfterClass')
//            ->everyThirtyMinutes()
//            ->between('1:00', '15:00');

        // 北京时间每天9:00~23:00 每半小时运行一次
        $schedule->command('AfterClass')
            ->hourlyAt(01)
            ->between('1:00', '15:00');
        $schedule->command('AfterClass')
            ->hourlyAt(11)
            ->between('1:00', '15:00');
        $schedule->command('AfterClass')
            ->hourlyAt(21)
            ->between('1:00', '15:00');
        $schedule->command('AfterClass')
            ->hourlyAt(31)
            ->between('1:00', '15:00');
        $schedule->command('AfterClass')
            ->hourlyAt(41)
            ->between('1:00', '15:00');
        $schedule->command('AfterClass')
            ->hourlyAt(51)
            ->between('1:00', '15:00');

        // 每年更新年级
        $schedule->command('AddGrade')
            ->monthlyOn(1, '00:00')
            ->when(function () {
                $date = Carbon::parse($this->gradeupdatedate);
                Log::info('年级判断');
                if ($date->isBirthday(Carbon::now()))
                {
                    return true;
                }
                return false;
            });

        // 北京时间每月21日0点，添加下月课程
        $schedule->command('CreateMonthLessons')
            ->monthlyOn(20, '16:00');
            // ->hourlyAt(58);
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
