<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Log;
use App\Course;
use Carbon\Carbon;
//use App\Http\Controllers\CourseToNewLesson;

class CreateMonthLessons extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'CreateMonthLessons';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = '创建下月课程';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }


    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
		Log::info('创建下月课程');
		$courses = Course::all();
		$month = Carbon::now('Asia/Shanghai')->month+1;
		foreach ($courses as $item)
        {
            $item->createMonthLessons($month);
        }
    }

}
