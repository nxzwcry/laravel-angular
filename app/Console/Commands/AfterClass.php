<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Log;
use App\Wechat;
use App\Student;
use App\Lesson;
//use App\Course;
use Carbon\Carbon;
//use App\Http\Controllers\CourseToNewLesson;

class AfterClass extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'AfterClass';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = '课程完课及发送提醒';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }



//	protected $tempid = 'wAwg1tpsE-VMQhhXmu35J9fJe9evuNjFH3WbRa5D3V8'; //测试ID
	protected $tempid = 'M1-y9hs_aaNIAFPm_DaWYRZIKjQLRYYXArPFNprKMXk'; //正式ID
	protected $url = 'deepspring.cn/wechat/userinfo';
    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
		Log::info('完课执行');
		$lessons = Lesson::where( 'status' , 0 )
						->where( 'end_datetime' , '<=' , Carbon::now() )
						->get();
		$i = 0;
		foreach( $lessons as $lesson )
		{
		    $lesson->save();
		    $i++;
//            if ( $lesson -> ChackConduct() )
//            {
//                $student = Student::find( $lesson -> sid );
//                $wechats = Wechat::where( 'sid' , $lesson -> sid ) -> get();
//                $cost = '';
//                if ( $lesson -> cost <> 0 )
//                {
//                    $cost = $cost . '外教:' . $lesson -> cost . '节 '	;
//                }
//                if ( $lesson -> cost1 <> 0 )
//                {
//                    $cost = $cost . '中教:' . $lesson -> cost1 . '节 '	;
//                }
//                if ( $lesson -> cost2 <> 0 )
//                {
//                    $cost = $cost . '精品课:' . $lesson -> cost2 . '节 ';
//                }
//                if ( $cost == '' )
//                {
//                    $cost = '0节';
//                }
//                $next = Lesson::where( 'conduct' , 0 )
//                    -> where( 'sid' , $lesson -> sid )
//                    -> orderby('date')
//                    -> orderby('stime')
//                    -> first();
//                if ( $next )
//                {
//                    $nexttime = Carbon::parse( $next -> date . $next -> stime );
//                    $nextstring = $nexttime -> format('m月d日 H:i') . ' ' . numtoweek($nexttime ->dayOfWeek);
//                }
//                else{
//                    $nextstring = '未安排下一节课程';
//                }
//                foreach( $wechats as $wechat )
//                {
//                    $this -> endmassage( [ 'touser' => $wechat -> openid ,
//                        'keyword1' => $student -> name . ' ' . $student -> ename ,
//                        'keyword2' => $lesson -> date ,
//                        'keyword3' => $cost ,
//                        'keyword4' => '外教:' . $lesson -> cost . '节 ' . '中教:' . $lesson -> cost1 . '节 ' . '精品课:' . $lesson -> cost2 . '节' ,
//                        'keyword5' => $nextstring ] );
//                }
//            }
            Log::info($lesson->id.'完课');
		}
		Log::info('完课执行');
    }
    
    public function endmassage( $data )
    {
    	$wechat = app('wechat');
		$notice = $wechat->notice;
		$messageId = $notice->send([
	        'touser' => $data['touser'],
	        'template_id' => $this -> tempid,
	        'url' => $this -> url,
	        'data' => [
	            'first' => '深泉教育提醒您 刚刚上完如下课程',
	            'keyword1' => $data['keyword1'],
	            'keyword2' => $data['keyword2'],
	            'keyword3' => $data['keyword3'],
	            'keyword4' => $data['keyword4'],
	            'keyword5' => $data['keyword5'],
	            'remark' => "\n复习视频和作业预计两天内上传，请及时复习。如需请假请提前24小时以上联系老师，如有疑问请拨打电话15378928311",
	        ],
	    ]);
    }

    public function ChackConduct()
    {
    }
      
//    use CourseToNewLesson;
}
