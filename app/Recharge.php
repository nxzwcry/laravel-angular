<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;

class Recharge extends Model
{
    use SoftDeletes;
    /**
     * 与模型关联的数据表。
     *
     * @var string
     */
    //指定表名
    protected $table = 'recharges';
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
        return $this->belongsTo('App\Student' , 'student_id');
    }

    public function user()
    {
        return $this->belongsTo('App\User' , 'user_id');
    }

    // 统计stime到etime之间的所有充值数据
    public static function getCount($stime, Carbon $etime)
    {
        $waijiao = 0;
        $zhongjiao = 0;
        $money = 0;
        if ($etime)
        {
            if ($stime)
            {
                $data = Recharge::where('created_at', '>=', $stime)
                    ->where('created_at', '<=', $etime);
            }
            else
            {
                $data = Recharge::where('created_at', '<=', $etime);
            }
            $waijiao = $data -> sum('waijiao');
            $zhongjiao = $data -> sum('zhongjiao');
            $money = $data -> sum('money');
        }
        return [
            'waijiao' => $waijiao,
            'zhongjiao' => $zhongjiao,
            'money' => $money,
        ];
    }

}