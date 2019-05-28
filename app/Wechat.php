<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;

class Wechat extends Model
{
    use SoftDeletes;
    use LogsActivity;
    protected static $logUnguarded = true;
    protected static $logOnlyDirty = true;
    /**
     * 与模型关联的数据表。
     *
     * @var string
     */
    //指定表名
    protected $table = 'wechats';
    //指定关键字
    protected $primaryKey = 'id';
    //自动维护时间戳
    public $timestamps = true;

    //不允许批量赋值的字段
    protected $guarded = [ 'id' , 'created_at' , 'updated_at' ];

    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

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

}