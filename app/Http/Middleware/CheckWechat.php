<?php
namespace App\Http\Middleware;

use Closure;
use App\Wechat;
use App\Student;
use Log;

class CheckWechat{
	
	// 检查微信和学生有没有关联起来
	
	public function handle($request, Closure $next)
    {
    	$user = session('wechat.oauth_user.default'); // 拿到授权用户资料
    	Log::info('获取用户资料');
    	$con = Wechat::where( 'openid' , $user->id ) -> first();

//	    dd($con);
    	
        if ( $con == null ) {
            Log::info('用户未绑定');
            return redirect('wechat/connect');
        }
        
        $student = Student::where( 'id' , $con -> student_id ) -> first();
//        Log::info('学生id'.$con -> sid);
    		
		if ( $student == null ) {
			Wechat::where( 'openid' , $user->id ) -> delete();
        	return redirect('wechat/connect');
        }
        
        $request->session()->put('sid', $con -> student_id);

        Log::info('用户登录成功');
        return $next($request);
    }
	
}

?>