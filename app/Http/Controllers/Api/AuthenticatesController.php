<?php
namespace App\Http\Controllers\Api;

use Carbon\Carbon;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Auth;
use Laravel\Passport\Client;
use Socialite;

use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Validator;

class AuthenticateController extends ApiController
{

    public $successStatus = 200;

    use AuthenticatesUsers;

    public function __construct()
    {
        $this->middleware('auth:api')->only([
            'logout'
        ]);
    }

    public function username()
    {
        return 'email';
    }

    // 登录
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'    => 'required|exists:users',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            $request->request->add([
                'errors' => $validator->errors()->toArray(),
                'code' => 401,
            ]);
            return $this->sendFailedLoginResponse($request);
        }

        if(Auth::attempt(['email' => request('email'), 'password' => request('password')])) {
            $user = Auth::user();
            if ($user->isActive()) { // 如果用户被删除则登录不成功
                $token = $user->createToken('MyApp')->accessToken;
                return $this->success(compact('token'));
            }
        }

        return $this->setStatusCode(401)->failed('登录失败');

    }

    // 退出登录
    public function logout(Request $request)
    {

        if (Auth::guard('api')->check()){

            Auth::guard('api')->user()->token()->revoke();

        }

        return $this->message('退出登录成功');

    }

    protected function sendFailedLoginResponse(Request $request)
    {
        $msg = $request['errors'];
        $code = $request['code'];
        return $this->setStatusCode($code)->failed($msg);
    }
}