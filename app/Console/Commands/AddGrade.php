<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Log;
use App\Student;
use Illuminate\Support\Facades\DB;

class AddGrade extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'AddGrade';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = '增加学生年级';

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
		Log::info('年级增加');
    	DB::table('students')->increment('grade');
        return 1;
    }
    
}
