<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Phone extends Model
{
    use SoftDeletes;
    /**
     * 与模型关联的数据表。
     *
     * @var string
     */
    //指定表名
    protected $table = 'phones';
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

    // 处理更新、添加电话
    public static function deal(array $phones, $sid)
    {
        foreach ($phones as $phone)
        {
            // 如果id不为0，表示这是一个更新请求
            if ($phone['id'])
            {
                $res = Phone::find($phone['id']);
                if ($res)
                {
                    $res->update([
                        'name' => $phone['name'],
                        'phone_number' => $phone['phone_number'],
                    ]);
                }
            }
            // 如果id为0，表示这是一个添加请求
            else{
                Phone::create([
                    'name' => $phone['name'],
                    'phone_number' => $phone['phone_number'],
                    'student_id' => $sid,
                ]);
            }
        }
    }

}