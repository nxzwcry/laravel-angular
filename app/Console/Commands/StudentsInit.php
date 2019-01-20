<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Log;
use App\Student;
use Illuminate\Support\Facades\DB;

class StudentsInit extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'StudentsInit';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = '整理学生状态';

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
		$students = Student::all();
		foreach ($students as $item)
        {
            $item->statusInit();
        }
    }
    
}
