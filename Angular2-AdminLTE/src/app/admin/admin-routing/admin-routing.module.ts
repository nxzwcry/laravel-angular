import { AdminUserCreateComponent } from './../admin-user/admin-user-create/admin-user-create.component';
import { AdminUserManageComponent } from './../admin-user/admin-user-manage/admin-user-manage.component';
import { AdminStudentlistOne2oneComponent } from './../admin-studentlist/admin-studentlist-one2one/admin-studentlist-one2one.component';
import { AdminComponent } from './../admin.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {AdminRoleManageComponent} from "../admin-user/admin-role-manage/admin-role-manage.component";
import {AdminPermissionManageComponent} from "../admin-user/admin-permission-manage/admin-permission-manage.component";
import {AdminStudentCreateComponent} from "../admin-student/admin-student-create/admin-student-create.component";
import {AuthGuard} from "../../guard/auth.guard";
import {AdminStudentlistTeamComponent} from "../admin-studentlist/admin-studentlist-team/admin-studentlist-team.component";
import {AdminStudentlistStoppedComponent} from "../admin-studentlist/admin-studentlist-stopped/admin-studentlist-stopped.component";
import {AdminTeamListComponent} from "../admin-team/admin-team-list/admin-team-list.component";
import {AdminTeamCreateComponent} from "../admin-team/admin-team-create/admin-team-create.component";
import {AdminCourseTeacherComponent} from "../admin-course/admin-course-teacher/admin-course-teacher.component";
import {AdminCourseDemoComponent} from "../admin-course/admin-course-demo/admin-course-demo.component";
import {AdminCourseLessonsComponent} from "../admin-course/admin-course-lessons/admin-course-lessons.component";
import {AdminCourseVideosComponent} from "../admin-course/admin-course-videos/admin-course-videos.component";
import {AdminCourseViewComponent} from "../admin-course/admin-course-view/admin-course-view.component";
import {AdminStudentShowComponent} from "../admin-student/admin-student-show/admin-student-show.component";
import {AdminStudentChangeComponent} from "../admin-student/admin-student-change/admin-student-change.component";
import {AdminRechargeListComponent} from "../admin-recharge/admin-recharge-list/admin-recharge-list.component";
import {AdminRechargeShowComponent} from "../admin-recharge/admin-recharge-show/admin-recharge-show.component";
import {AdminRechargeCreateComponent} from "../admin-recharge/admin-recharge-create/admin-recharge-create.component";
import {AdminRechargeChangeComponent} from "../admin-recharge/admin-recharge-change/admin-recharge-change.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'admin',
        component: AdminComponent,
        children: [
          {
            path: '',
            redirectTo: 'student_list/one2one',
            pathMatch: 'full'
          },
          // {
          //   path: 'dashboard1',
          //   component: AdminDashboard1Component
          // },
          // {
          //   path: 'dashboard2',
          //   component: AdminDashboard2Component
          // },
          {
            path: 'user/create',
            component: AdminUserCreateComponent
          },
          {
              path: 'user/manage',
              component: AdminUserManageComponent
          },
          {
              path: 'user/roles',
              component: AdminRoleManageComponent
          },
          {
              path: 'user/permissions',
              component: AdminPermissionManageComponent
          },
          {
              path: 'student_list/one2one',
              component: AdminStudentlistOne2oneComponent
          },
          {
            path: 'student_list/create_student',
            component: AdminStudentCreateComponent
          },
          {
            path: 'student_list/team',
            component: AdminStudentlistTeamComponent
          },
          {
            path: 'student_list/stopped',
            component: AdminStudentlistStoppedComponent
          },
          {
            path: 'student/:id',
            component: AdminStudentShowComponent
          },
          {
            path: 'student_change/:id',
            component: AdminStudentChangeComponent
          },
          {
            path: 'recharge_list/:id',
            component: AdminRechargeListComponent
          },
          // {
          //   path: 'recharge/:id',
          //   component: AdminRechargeShowComponent
          // },
          {
            path: 'recharge_create/:id',
            component: AdminRechargeCreateComponent
          },
          {
            path: 'recharge_change/:id',
            component: AdminRechargeChangeComponent
          },
          {
            path: 'team/list',
            component: AdminTeamListComponent
          },
          {
            path: 'team/create',
            component: AdminTeamCreateComponent
          },
          {
            path: 'course/teacher',
            component: AdminCourseTeacherComponent
          },
          {
            path: 'course/demo',
            component: AdminCourseDemoComponent
          },
          {
            path: 'course/lessons',
            component: AdminCourseLessonsComponent
          },
          {
            path: 'course/videos',
            component: AdminCourseVideosComponent
          },
          {
            path: 'course/view',
            component: AdminCourseViewComponent
          },
        ],
        canActivate:[AuthGuard],
      }
    ])
  ],
  exports: [
    RouterModule
  ],
  providers:[AuthGuard]
})
export class AdminRoutingModule { }
