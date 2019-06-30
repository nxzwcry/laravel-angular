<!DOCTYPE html>
<html>
	
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" type="text/css" href="{{ URL::asset('css/weui.min.css') }}"/>
		<link rel="stylesheet" type="text/css" href="{{ URL::asset('css/jquery-weui.min.css') }}"/>
		<style type="text/css">
			html,body{
				height: 100%;
			};
			page {
				display: block;
				min-height: 100%;
				background-color:red ;
			}
		</style>
				<title>微信账号关联</title>
	</head>
		
	<body>
	<div class="page">
		{!! Form::open(['url' => 'wechat/connectto']) !!}
		<div class="weui-cell">
			<h3>请输入以下信息关注学生</h3>
		</div>
	   <div class="weui-cell">
	   		<div class="weui-cell__hd">
	       {!! Form::label('sid','学生号:',['class' => 'weui-label']) !!}
	       	</div>
	       	<div class="weui-cell__hd">
	       {!! Form::text('sid','',['class' => 'weui-input']) !!}
	       </div>
	   </div>
	   <div class="weui-cell">
	   		<div class="weui-cell__hd">
	       {!! Form::label('sname','学生姓名:',['class' => 'weui-label']) !!}
	       	</div>
	       	<div class="weui-cell__hd">
	       {!! Form::text('sname','',['class' => 'weui-input']) !!}
	       </div>
	   </div>
	   <div class="weui-cell">
	   		<div class="weui-cell__hd">
	       {!! Form::label('captcha','验证码:',['class' => 'weui-label']) !!}
	       	</div>
	       	<div class="weui-cell__hd">
	       {!! Form::text('captcha','',['class' => 'weui-input']) !!}
	       </div>
	       <div class="weui-cell__hd">
	       	<img src="{{captcha_src()}}">
	       </div>
	   </div>
	   <div class="weui-cell__hd">
	       {!! Form::submit('确定',['class' => 'weui-btn weui-btn_primary']) !!}
	   </div>
		{!! Form::close() !!}
		</form>
			
		<script src="{{ URL::asset('js/jquery-2.1.4.js') }}"></script>		
		<script src="{{ URL::asset('js/jquery-weui.min.js') }}"></script>
	</div>
	</body>
	
</html>