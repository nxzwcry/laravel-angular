@extends('layouts.layouts')

@section('header')
<style type="text/css">
	  h1 {
	  	color: #666;
	  	margin: 10%;
	  }
</style>
@stop

@section('userinfo')
{{--	hello world--}}
<header class="demos-header">
	<h1 class="demos-title">{{ $students -> name }} {{ $students -> ename }}</h1>
</header>
<div class="bd">
	<div class="page__bd">
{{--		<!--<div class="weui-cells__title">学生基本信息</div>-->--}}
		<div class="weui-cells">
		  <div class="weui-cell">
		    <div class="weui-cell__bd">
		      <p>班级</p>
		    </div>
		    <div class="weui-cell__ft">{{ $team }}</div>
		  </div>
		  <div class="weui-cell">
		    <div class="weui-cell__bd">
		      <p>任课老师</p>
		    </div>
		    <div class="weui-cell__ft">{{ $cteacher }}</div>
		  </div>
			<div class="weui-cell">
				<div class="weui-cell__bd">
					<p>课程顾问</p>
				</div>
				<div class="weui-cell__ft">{{ $agent }}</div>
			</div>
		  <div class="weui-cell">
		    <div class="weui-cell__bd">
		      <p>积分</p>
		    </div>
		    <div class="weui-cell__ft">{{ $score }}</div>
		  </div>
		</div>

		<div class="weui-cells__title">剩余课时</div>
		<div class="weui-cells">
			  <div class="weui-cell">
				<div class="weui-cell__bd">
				</div>
				<div class="weui-cell__ft"
					@if ($waijiao+$zhongjiao < 10)
						style="color: #f5222d"
					@endif
				>
					{{ $waijiao+$zhongjiao }}课时
				</div>
			  </div>
{{--		  <div class="weui-cell">--}}
{{--		    <div class="weui-cell__bd">--}}
{{--		      <p>外教</p>--}}
{{--		    </div>--}}
{{--		    <div class="weui-cell__ft">{{ $waijiao }}课时</div>--}}
{{--		  </div>--}}
{{--		  <div class="weui-cell">--}}
{{--		    <div class="weui-cell__bd">--}}
{{--		      <p>中教</p>--}}
{{--		    </div>--}}
{{--		    <div class="weui-cell__ft">{{ $zhongjiao }}课时</div>--}}
{{--		  </div>--}}
		</div>
	</div>
</div>
@stop

@section('lessons')
{{--lesson--}}
<div class="bd">
	<div class="page__bd">
	<div class="weui-panel__hd">待上课程</div>
		@foreach ( $newlessons as $newlesson )
    <div class="weui-form-preview">
      <div class="weui-form-preview__hd">
         <h4 class="weui-media-box__title">{{ substr($newlesson->start_datetime->timezone('Asia/shanghai'), 0, 10) . ' ' . numtoweek(Carbon\Carbon::parse($newlesson->start_datetime->timezone('Asia/shanghai')) -> dayOfWeek) . ' ' . substr( $newlesson->start_datetime->timezone('Asia/shanghai') , 11 , 5 ) . '~' . substr( $newlesson->end_datetime->timezone('Asia/shanghai') , 11 , 5 ) }}</h4>
  		</div>
      <div class="weui-form-preview__bd">
      	<div class="weui-form-preview__item">
        	<label class="weui-form-preview__label">授课内容</label>
        	<span class="weui-form-preview__value">{{ $newlesson -> name }}</span>
        </div>
{{--      	<div class="weui-form-preview__item">--}}
{{--        	<label class="weui-form-preview__label">课程类型</label>--}}
{{--        	<span class="weui-form-preview__value">--}}
{{--					@if ( $newlesson -> type == 'w' )--}}
{{--			   		外教1对1--}}
{{--					@elseif ( $newlesson -> type == 'f' )--}}
{{--						复习课--}}
{{--					@elseif ( $newlesson -> type == 'j' )--}}
{{--						精品课--}}
{{--					@elseif ( $newlesson -> type == 'b' )--}}
{{--						班课--}}
{{--					@endif--}}
{{--					</span>--}}
{{--        </div>--}}
      	<div class="weui-form-preview__item">
					<label class="weui-form-preview__label">授课教师</label>
					<span class="weui-form-preview__value">
					{{ $newlesson->cteacher ? $newlesson->cteacher->ename . '('. $newlesson->cteacher->name . ')' : '' }}{{ $newlesson->fteacher ? '&'.$newlesson->fteacher->name : '' }}<br/>
					</span>
        </div>
{{--      	<div class="weui-form-preview__item">--}}
{{--					<label class="weui-form-preview__label">会议ID</label>--}}
{{--					<span class="weui-form-preview__value">{{ $newlesson -> mid }}</span>--}}
{{--        </div>--}}
      	<div class="weui-form-preview__item">
					<label class="weui-form-preview__label">授课地点</label>
					<span class="weui-form-preview__value">{{ $newlesson->place ? $newlesson->place->name : '' }}</span>
        </div>
{{--      	<div class="weui-form-preview__item">--}}
{{--					<label class="weui-form-preview__label">消费课时</label>--}}
{{--					<span class="weui-form-preview__value">--}}
{{--					@if ( $newlesson -> cost <> 0 )--}}
{{--						外教1对1&emsp;{{ $newlesson -> cost }}节&emsp;--}}
{{--					@endif--}}
{{--					@if ( $newlesson -> cost1 <> 0 )--}}
{{--						中教课程&emsp;{{ $newlesson -> cost1 }}节&emsp;--}}
{{--					@endif--}}
{{--					@if ( $newlesson -> cost2 <> 0 )--}}
{{--						外教精品课&emsp;{{ $newlesson -> cost2 }}节--}}
{{--					@endif--}}
{{--					</span>--}}
{{--       </div>--}}
      </div>
    </div>
    @endforeach


	</div>
</div>
@stop

@section('file')
{{--file--}}
<div class="bd">
	<div class="page__bd">
		<div class="weui-panel">
			<div class="weui-panel__hd">已完成课程列表</div>
			<div class="weui-panel__bd">
				@foreach ( $oldlessons as $lesson )
					<div class="weui-media-box weui-media-box_text">
						<h4 class="weui-media-box__title">{{ substr($lesson->start_datetime->timezone('Asia/shanghai'), 0, 16) }}
							@if ($lesson->lesson_type == 'bu')
								<span class="weui-badge" style="margin-left: 5px;background-color: #faab28">补课</span>
							@endif
							@if ($lesson->status == 1)
								<span class="weui-badge" style="margin-left: 5px;background-color: #70be2a">正常完成</span>
							@elseif ($lesson->statis == 2)
								<span class="weui-badge" style="margin-left: 5px;background-color: #99bdb8">待确认</span>
							@else
								<span class="weui-badge" style="margin-left: 5px;">请假</span>
							@endif
						</h4>
						<p class="weui-media-box__desc">
							{{ $lesson->name }}&emsp;{{ $lesson->cteacher ? $lesson->cteacher->ename . '('. $lesson->cteacher->name . ')' : '' }}{{ $lesson->fteacher ? '&'.$lesson->fteacher->name : '' }}<br/>
{{--							耗课：中教{{ $lesson->zhongjiao_cost }}课时/外教{{ $lesson->waijiao_cost }}课时--}}
							耗课：{{ $lesson->zhongjiao_cost+$lesson->waijiao_cost }}课时
						</p>
						<ul class="weui-media-box__info">
							@if ( $lesson -> video <> null )
								<li class="weui-media-box__info__meta"><a href="{{ $lesson -> video -> url }}">外教课视频</a></li>
							@endif
						</ul>

					</div>
				@endforeach
			</div>
		</div>
	</div>
</div>
@stop
