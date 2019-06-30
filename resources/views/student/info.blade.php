@extends('layouts.layouts')

@section('header')
<!--<style type="text/css">
	  h1 {
	  	color: #666;
	  	margin: 10% 0;
	  }
</style>-->
@stop

@section('userinfo')
<header class="demos-header">
	<h1 class="demos-title">{{ $students -> name }} {{ $students -> ename }}</h1>
</header>
<div class="bd">
	<div class="page__bd">
		<!--<div class="weui-cells__title">学生基本信息</div>-->
		<div class="weui-cells">
		  <!--<div class="weui-cell">
		    <div class="weui-cell__bd">
		      <p>性别</p>
		    </div>
		    <div class="weui-cell__ft">{{ $students -> sex }}</div>
		  </div>
		  <div class="weui-cell">
		    <div class="weui-cell__bd">
		      <p>生日</p>
		    </div>
		    <div class="weui-cell__ft">{{ substr( $students -> birthday , 0 , 10 ) }}</div>
		  </div>-->
		  <div class="weui-cell">
		    <div class="weui-cell__bd">
		      <p>积分</p>
		    </div>
		    <div class="weui-cell__ft">{{ $lessons -> sum('score') }}</div>
		  </div>
		</div>
		
		<div class="weui-cells__title">剩余课时</div>
		<div class="weui-cells">
		  <div class="weui-cell">
		    <div class="weui-cell__bd">
		      <p>外教</p>
		    </div>
		    <div class="weui-cell__ft">{{ $recharges -> sum('lessons') - $lessons -> sum('cost') }}课时</div>
		  </div>
		  <div class="weui-cell">
		    <div class="weui-cell__bd">
		      <p>中教</p>
		    </div>
		    <div class="weui-cell__ft">{{ $recharges -> sum('lessons1') - $lessons -> sum('cost1') }}课时</div>
		  </div>
		</div>
	</div>
</div>
@stop

@section('lessons')

<div class="bd">
	<div class="page__bd">
	<div class="weui-panel__hd">下节课程</div>
		@foreach ( $newlessons as $newlesson )
    <div class="weui-form-preview">
      <div class="weui-form-preview__hd">
         <h4 class="weui-media-box__title">{{ $newlesson -> date . ' ' . numtoweek(Carbon\Carbon::parse($newlesson -> date) -> dayOfWeek) . ' ' . substr( $newlesson -> stime , 0 , 5 ) . '~' . substr( $newlesson -> etime , 0 , 5 ) }}</h4>
  		</div>
      <div class="weui-form-preview__bd">
      	<div class="weui-form-preview__item">
        	<label class="weui-form-preview__label">授课内容</label>
        	<span class="weui-form-preview__value">{{ $newlesson -> name }}</span>
        </div>
      	<div class="weui-form-preview__item">
        	<label class="weui-form-preview__label">课程类型</label>
        	<span class="weui-form-preview__value">
					@if ( $newlesson -> type == 'w' )
			   		外教1对1
					@elseif ( $newlesson -> type == 'f' )
						复习课
					@elseif ( $newlesson -> type == 'j' )
						精品课
					@elseif ( $newlesson -> type == 'b' )
						班课
					@endif
					</span>
        </div>
      	<div class="weui-form-preview__item">
					<label class="weui-form-preview__label">授课教师</label>
					<span class="weui-form-preview__value">
					{{ $newlesson -> tname }}{{ ( $newlesson -> cteacher ) && ( $newlesson -> tname <> '' ) ? ' & ' : '' }}{{ $newlesson -> cteacher ? $newlesson -> cteacher -> tname : '' }}<br/>
					</span>
        </div>
      	<div class="weui-form-preview__item">
					<label class="weui-form-preview__label">会议ID</label>
					<span class="weui-form-preview__value">{{ $newlesson -> mid }}</span>
        </div>
      	<div class="weui-form-preview__item">
					<label class="weui-form-preview__label">授课地点</label>
					<span class="weui-form-preview__value">{{ $newlesson -> place -> name }}</span>
        </div>
      	<div class="weui-form-preview__item">
					<label class="weui-form-preview__label">消费课时</label>
					<span class="weui-form-preview__value">
					@if ( $newlesson -> cost <> 0 )
						外教1对1&emsp;{{ $newlesson -> cost }}节&emsp;
					@endif
					@if ( $newlesson -> cost1 <> 0 )
						中教课程&emsp;{{ $newlesson -> cost1 }}节&emsp;
					@endif
					@if ( $newlesson -> cost2 <> 0 )
						外教精品课&emsp;{{ $newlesson -> cost2 }}节
					@endif
					</span>
       </div>
      </div>
    </div>
    @endforeach

	
	</div>
</div>
@stop

@section('file')

<div class="bd">
	<div class="page__bd">
		<div class="weui-panel">
			<div class="weui-panel__hd">已完成课程列表</div>
			<div class="weui-panel__bd">
				@foreach ( $lessons as $lesson )
					<div class="weui-media-box weui-media-box_text">
						<h4 class="weui-media-box__title">{{ $lesson -> date }}</h4>
						<p class="weui-media-box__desc">
							上课教师：{{ $lesson -> tname }}{{ ( $lesson -> cteacher ) && ( $lesson -> tname <> '' ) ? ' & ' : '' }}{{ $lesson -> cteacher ? $lesson -> cteacher -> tname : '' }}<br/>
							课程内容：{{ $lesson -> name }}
						</p>
						<ul class="weui-media-box__info">
							@if ( $lesson -> vid <> null )
								<li class="weui-media-box__info__meta"><a href="{{ url('wechat/video') . '/' . $lesson -> id }}">视频</a></li>
							@endif
						</ul>
	
					</div>
				@endforeach
			</div>
		</div>
	</div>
</div>
@stop
