<!DOCTYPE html>
<html>
	
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" href="https://cdn.bootcss.com/weui/1.1.3/style/weui.min.css">
		<link rel="stylesheet" href="https://cdn.bootcss.com/jquery-weui/1.2.1/css/jquery-weui.min.css">
		<link rel="stylesheet" type="text/css" href="{{ URL::asset('css/demos.css') }}"/>
		<style type="text/css">
			body{
				background-color: #fdfdfd;
			}
		</style>
		@yield('header')
		<title>@yield('title')</title>
	</head>
	
	<body>
		
		<div class="weui-tab">
			
		  <div class="weui-navbar">
		    <a class="weui-navbar__item weui-bar__item--on" href="#tab1">
		      学生信息
		    </a>
		    
		    <a class="weui-navbar__item" href="#tab2">
		      课程表
		      
		    </a>
		    
		    <a class="weui-navbar__item" href="#tab3">
		      上课记录
		      
		    </a>
		  </div>
		  
		  <div class="weui-tab__bd">
		
		    <div id="tab1" class="weui-tab__bd-item weui-tab__bd-item--active">
		      @yield('userinfo','用户信息页面')
		    </div>
		    
		    <div id="tab2" class="weui-tab__bd-item">
		      @yield('lessons','课程信息区域')
		    </div>
		    
		    <div id="tab3" class="weui-tab__bd-item">
		      @yield('file','课件视频区域')
		    </div>
		    
		  </div>
		  
		
		</div>


		<script src="https://cdn.bootcss.com/jquery/1.11.0/jquery.min.js"></script>
		<script src="https://cdn.bootcss.com/jquery-weui/1.2.1/js/jquery-weui.min.js"></script>
	</body>
	
</html>
