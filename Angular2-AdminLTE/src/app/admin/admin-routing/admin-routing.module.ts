import { AdminDashboard2Component } from './../admin-dashboard2/admin-dashboard2.component';
import { AdminDashboard1Component } from './../admin-dashboard1/admin-dashboard1.component';
import { AdminUserCreateComponent } from './../admin-user/admin-user-create/admin-user-create.component';
import { AdminUserManageComponent } from './../admin-user/admin-user-manage/admin-user-manage.component';
import { AdminStudentlistOne2oneComponent } from './../admin-studentlist/admin-studentlist-one2one/admin-studentlist-one2one.component';
import { AdminComponent } from './../admin.component';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {AdminRoleManageComponent} from "../admin-user/admin-role-manage/admin-role-manage.component";
import {AdminPermissionManageComponent} from "../admin-user/admin-permission-manage/admin-permission-manage.component";
import {AdminStudentlistCreateComponent} from "../admin-studentlist/admin-studentlist-create/admin-studentlist-create.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'admin',
        component: AdminComponent,
        children: [
          {
            path: '',
            redirectTo: 'dashboard1',
            pathMatch: 'full'
          },
          {
            path: 'dashboard1',
            component: AdminDashboard1Component
          },
          {
            path: 'dashboard2',
            component: AdminDashboard2Component
          },
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
              component: AdminStudentlistCreateComponent
          },
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
