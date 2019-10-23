<?php

namespace App\Http\Controllers;
use Carbon\Carbon;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Student;
use App\Lesson;
use App\Course;
use App\Recharge;

class StudentController extends Controller
{
	// 在微信客户端显示用户信息
	public function userinfo(Request $request)
	{
		$sid = $request->session()->get('sid', null);
//        dd("学生页面跳转成功".$sid);

		if ( $sid == null ) return view( 'student.connect' );

		// 获取学生信息
		$students = Student::where( 'id' , $sid ) -> first();

		if ( $students == null ) return view( 'student.connect' );


		// 购课记录
//		$recharges = Recharge::where('student_id' , $sid)
//			-> orderby('created_at' , 'desc' )
//    		-> get();

//    	// 已上课程列表
//    	$lessons = Lesson::where('student_id' , $sid)
//			-> where('conduct' , 1 )
//			-> orderby('date' , 'desc' )
//			-> orderby('etime' , 'desc' )
//    		-> get();
//
//    	// 下节课程
//    	$newlessons = Lesson::where('sid' , $sid)
//			-> where('conduct' , 0 )
//			-> orderby('date' )
//			-> orderby('stime' )
//    		-> get();
    	
		return view( 'student.info' ,
            [
                'students' => $students,
                'score' => $students->getScore(),
                'waijiao' => $students->getLeftWaijiao(),
                'zhongjiao' => $students->getLeftZhongjiao(),
                'oldlessons' => $students->getNotNewLessons(),
                'newlessons' => $students->getNewLessons(),
                'courses' => $students->courses,
                'cteacher' => $students->cteacher ? $students->cteacher->name : '',
                'agent' => $students->agent ? $students->agent->name : '',
                'team' => $students->team ? $students->team->name : '',
            ]);

//		return view( 'student.info');

	}
}