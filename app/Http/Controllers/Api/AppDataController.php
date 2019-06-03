<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Auth;

class AppdataController extends ApiController
{
    private $appInfo = [
        'name' => "深泉英语",
        'description' => "深泉英语学员管理系统",
    ];

    private $userInfo = [];

    private $menuInfo =
        [[
        'text' => '主导航',
        'group' => 'true',
        'children' => [
            [
                'text' => '顾问控制面板',
                'link' => '/dashboard-agent',
                'icon' => [
                    'type' => 'icon',
                    'value' => 'appstore',
                    ],
                'acl' => [
                    'ability' => ['show-agent-home'],
                ],
            ],
            [
                'text' => '教师控制面板',
                'link' => '/dashboard-teacher',
                'icon' => [
                    'type' => 'icon',
                    'value' => 'appstore',
                ],
                'acl' => [
                    'ability' => ['show-teacher-home'],
                ],
            ],
            [
                'text' => '用户管理',
                'link' => '/users/list',
                'icon' => [
                    'type' => 'icon',
                    'value' => 'user',
                    ],
                'acl' => [
                    'ability' => ['user-view'],
                    ],
                ],
            [
                'text' => '权限管理',
                'icon' => [
                    'type' => 'icon',
                    'value' => 'key',
                    ],
                'acl' => [
                    'ability' => ['permission-all'],
                    ],
                'children' => [
                    [
                        'text' => '角色管理',
                        'link' => '/permissions/role-list',
                    ],
                    [
                        'text' => '权限管理',
                        'link' => '/permissions/permission-list',
                    ],
                ],
            ],
            [
                'text' => '学生/班级列表',
                'icon' => [
                    'type' => 'icon',
                    'value' => 'team',
                    ],
                'children' => [
                    [
                        'text' => '班级列表',
                        'link' => '/teams/list',
                    ],
                    [
                        'text' => '班课学生',
                        'link' => '/students/team-students',
                    ],
                    [
                        'text' => '1对1学生',
                        'link' => '/students/one-to-one',
                    ],
//                    [
//                        'text' => '试听学生',
//                        'link' => '/students/demo',
//                    ],
                    [
                        'text' => '停课学生',
                        'link' => '/students/no-lessons',
                    ],
                    [
                        'text' => '不续费学生',
                        'link' => '/students/stoped',
                    ],
                ],
            ],
            [
                'text' => '课程安排',
                'icon' => [
                    'type' => 'icon',
                    'value' => 'calendar',
                    ],
                'children' => [
                    [
                        'text' => '待上课表',
                        'link' => '/lessons/future',
                    ],
                    [
                        'text' => '已上课程',
                        'link' => '/lessons/passed',
                    ],
                    [
                        'text' => '固定课表',
                        'link' => '/lessons/course-list',
                    ],
                    [
                        'text' => '请假列表',
                        'link' => '/lessons/leave',
                        'acl' => 'bulesson-create',
                    ],
                    [
                        'text' => '待确认列表',
                        'link' => '/lessons/confirm',
                        'acl' => 'bulesson-create',
                    ],
                    [
                        'text' => '日课表查询',
                        'link' => '/lessons/day-list',
                    ],
//                    [
//                        'text' => '安排试听课',
//                        'link' => '/lessons/create-demo',
//                    ],
                ],
            ],
            [
                'text' => '外教查询',
                'link' => '/fteachers/list',
                'icon' => [
                    'type' => 'icon',
                    'value' => 'search',
                ],
            ],
            [
                'text' => '统计',
                'icon' => [
                    'type' => 'icon',
                    'value' => 'bars',
                    ],
                'acl' => [
                    'ability' => ['teacher-count', 'month-count'],
                    'mode' => 'oneOf',
                    ],
                'children' => [
                    [
                        'text' => '个人统计',
                        'link' => '/count/user',
                        'acl' =>  [
                            'ability' => ['teacher-count'],
                            ],
                    ],
                    [
                        'text' => '月度统计',
                        'link' => '/count/month',
                        'acl' => [
                            'ability' => ['month-count'],
                            ],
                    ],
                    [
                        'text' => '年度统计',
                        'link' => '/count/year',
                        'acl' => [
                            'ability' => ['month-count'],
                        ],
                    ],
                ],
            ],
//            [
//                'text' => '快捷菜单',
//                'icon' => 'anticon anticon-rocket',
//                'shortcut_root' => 'true',
//            ],
        ],
    ]];

    private $user;

    public function index()
    {
        $info = [
            "app" => $this->appInfo,
            "menu" => $this->menuInfo,
        ];
        $user = auth('api')->user();
        if ($user) {

            $permissions = [];
            foreach($user->getAllPermissions() as $item){
                $permissions[] = $item->name;
            }

            $roles = [];
            foreach($user->getRoleNames() as $item){
                $roles[] = $item;
            }

            $this->userInfo = [
                "id" => $user->id,
                "name" => $user->name,
                "avatar" => "./assets/logo.jpg",
                "email" => $user->email,
                "roles" =>$roles,
                "permissions" =>$permissions,
            ];
        }
        $info['user'] = $this->userInfo;
        return $info;
    }

}