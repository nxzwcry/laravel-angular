import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimpleGuard } from '@delon/auth';
import { environment } from '@env/environment';
import {ACLGuard, ACLService, ACLType} from "@delon/acl";
// layout
import { LayoutDefaultComponent } from '../layout/default/default.component';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { ResetPasswordComponent } from "./passport/reset-password/reset-password.component";
// single pages
import { CallbackComponent } from './callback/callback.component';
import { UserLockComponent } from './passport/lock/lock.component';
import {DashboardAgentComponent} from "./dashboard-agent/dashboard-agent.component";
import {DashboardTeacherComponent} from "./dashboard-teacher/dashboard-teacher.component";


let home = { path: '', redirectTo: 'dashboard', pathMatch: 'full' };

const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    canActivate: [SimpleGuard],
    children: [
      home,
      { path: 'dashboard-agent', component: DashboardAgentComponent, canActivate: [ ACLGuard ], data: { guard: <ACLType>{ ability: [ 'show-agent-home' ], mode: 'allOf' }, title: '顾问控制面板' } },
      { path: 'dashboard-teacher', component: DashboardTeacherComponent, canActivate: [ ACLGuard ], data: { guard: <ACLType>{ ability: [ 'show-teacher-home' ], mode: 'allOf' }, title: '教师控制面板' } },
      { path: 'dashboard', component: DashboardComponent, data: { title: '首页' }, },
      // 业务子模块
      { path: 'students', loadChildren: './students/students.module#StudentsModule', },
      { path: 'users', loadChildren: './users/users.module#UsersModule', },
      { path: 'permissions', loadChildren: './permissions/permissions.module#PermissionsModule', },
      { path: 'lessons', loadChildren: './lessons/lessons.module#LessonsModule', },
      { path: 'teams', loadChildren: './teams/teams.module#TeamsModule', },
      { path: 'count', loadChildren: './count/count.module#CountModule', },
      { path: 'fteachers', loadChildren: './fteachers/fteachers.module#FteachersModule', },
    ],
  },
  {
    path: 'passport',
    component: LayoutPassportComponent,
    children: [
      { path: 'login', component: UserLoginComponent, data: { title: '登录' } },
      { path: 'reset-password/:token', component: ResetPasswordComponent, data: { title: '重置密码' } },
    ]
  },
  // 单页不包裹Layout
  { path: 'callback/:type', component: CallbackComponent },
  { path: 'lock', component: UserLockComponent, data: { title: '锁屏', titleI18n: 'lock' } },
  { path: '403', redirectTo: 'exception/403' },
  { path: '404', redirectTo: 'exception/404' },
  { path: '500', redirectTo: 'exception/500' },
  { path: '**', redirectTo: 'exception/404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes, {
        useHash: environment.useHash,
        // NOTICE: If you use `reuse-tab` component and turn on keepingScroll you can set to `disabled`
        // Pls refer to https://ng-alain.com/components/reuse-tab
        scrollPositionRestoration: 'top',
      }
    )],
  exports: [RouterModule],
})
export class RouteRoutingModule {

}
