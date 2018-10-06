import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';
// layout
import { LayoutDefaultComponent } from '../layout/default/default.component';
import { LayoutFullScreenComponent } from '../layout/fullscreen/fullscreen.component';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
// import { UserRegisterComponent } from './passport/register/register.component';
// import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
// single pages
import { CallbackComponent } from './callback/callback.component';
import { UserLockComponent } from './passport/lock/lock.component';
import { Exception403Component } from './exception/403.component';
import { Exception404Component } from './exception/404.component';
import { Exception500Component } from './exception/500.component';
import {SimpleGuard} from "@delon/auth";
import {UserResetPasswordComponent} from "./passport/reset-password/reset-password.component";

const routes: Routes = [
  // 全屏布局
  // {
  //     path: 'fullscreen',
  //     component: LayoutFullScreenComponent,
  //     children: [
  //     ]
  // },
  // passport
  {
    path: '',
    component: LayoutDefaultComponent,
    canActivateChild: [SimpleGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: DashboardComponent, data: { title: '首页' }, },
      // 业务子模块
      { path: 'students', loadChildren: './students/students.module#StudentsModule', },
      { path: 'users', loadChildren: './users/users.module#UsersModule', },
      { path: 'permissions', loadChildren: './permissions/permissions.module#PermissionsModule', },
      { path: 'lessons', loadChildren: './lessons/lessons.module#LessonsModule', },
      { path: 'teams', loadChildren: './teams/teams.module#TeamsModule', },
      { path: 'count', loadChildren: './count/count.module#CountModule', },
    ],
  },
  {
    path: 'passport',
    component: LayoutPassportComponent,
    children: [
      { path: 'login', component: UserLoginComponent, data: { title: '登录' } },
      // { path: 'register', component: UserRegisterComponent, data: { title: '注册' } },
      { path: 'reset-password/:token', component: UserResetPasswordComponent, data: { title: '重置密码' } },
      // { path: 'register-result', component: UserRegisterResultComponent, data: { title: '注册结果', titleI18n: 'pro-register-result' } }
      // { path: 'reset-result', component: UserRegisterResultComponent, data: { title: '找回密码结果' } }
    ]
  },
  // 单页不包裹Layout
  { path: 'callback/:type', component: CallbackComponent },
  { path: 'lock', component: UserLockComponent, data: { title: '锁屏', titleI18n: 'lock' } },
  { path: '403', component: Exception403Component },
  { path: '404', component: Exception404Component },
  { path: '500', component: Exception500Component },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: environment.useHash })],
  exports: [RouterModule]
})
export class RouteRoutingModule { }
