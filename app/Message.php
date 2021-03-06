<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Message extends Model
{
    use SoftDeletes;
    /**
     * 与模型关联的数据表。
     *
     * @var string
     */
    //指定表名
    protected $table = 'messages';
    //指定关键字
    protected $primaryKey = 'id';
    //自动维护时间戳
    public $timestamps = true;

    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    //不允许批量赋值的字段
    protected $guarded = [ 'id' , 'created_at' , 'updated_at' ];

    /**
     * 模型日期列的存储格式
     *
     * @var string
     */
//    protected $dateFormat = 'U';

    public function student()
    {
        return $this->belongsTo('App\Student' , 'sutdent_id');
    }

    public function wechat()
    {
        return $this->belongsTo('App\Student' , 'wechat_id');
    }

}