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
                'text' => '首页',
                'link' => '/dashboard',
                'icon' => 'anticon anticon-appstore-o',
                ],
            [
                'text' => '用户管理',
                'link' => '/users/list',
                'icon' => 'anticon anticon-appstore-o',
                'acl' => 'user-view',
                ],
            [
                'text' => '权限管理',
                'icon' => 'anticon anticon-appstore-o',
                'acl' => 'permission-all',
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
                'text' => '学生列表',
                'icon' => 'anticon anticon-appstore-o',
                'children' => [
                    [
                        'text' => '1对1学生',
                        'link' => '/students/one-to-one',
                    ],
                    [
                        'text' => '班课学生',
                        'link' => '/students/team-students',
                    ],
                    [
                        'text' => '试听学生',
                        'link' => '/students/demo',
                    ],
                    [
                        'text' => '未排课学生',
                        'link' => '/students/no-lesson',
                    ],
                    [
                        'text' => '停课学生',
                        'link' => '/students/stoped',
                    ],
                ],
            ],
            [
                'text' => '课程管理',
                'icon' => 'anticon anticon-appstore-o',
                'children' => [
                    [
                        'text' => '待上课表',
                        'link' => '/lessons/new-lessons',
                    ],
                    [
                        'text' => '已上课程',
                        'link' => '/lessons/old-lessons',
                    ],
                    [
                        'text' => '固定课表',
                        'link' => '/lessons/courses',
                    ],
                    [
                        'text' => '安排试听课',
                        'link' => '/lessons/create-demo',
                    ],
                ],
            ],
            [
                'text' => '快捷菜单',
                'icon' => 'anticon anticon-rocket',
                'shortcut_root' => 'true',
            ],
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
            $this->userInfo = [
                "id" => $user->id,
                "name" => $user->name,
                "avatar" => "./assets/tmp/img/avatar.jpg",
                "email" => $user->email,
                "acl" =>$permissions,
            ];
        }
        $info['user'] = $this->userInfo;
        return $info;
    }

}