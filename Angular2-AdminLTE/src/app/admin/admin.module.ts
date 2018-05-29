import { AdminRoutingModule } from './admin-routing/admin-routing.module';
import { AdminDashboard1Component } from './admin-dashboard1/admin-dashboard1.component';
import { AdminControlSidebarComponent } from './admin-control-sidebar/admin-control-sidebar.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { AdminContentComponent } from './admin-content/admin-content.component';
import { AdminLeftSideComponent } from './admin-left-side/admin-left-side.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboard2Component } from './admin-dashboard2/admin-dashboard2.component';
import { AdminUserManageComponent } from './admin-user/admin-user-manage/admin-user-manage.component';
import { AdminRoleManageComponent } from './admin-user/admin-role-manage/admin-role-manage.component';
import { AdminPermissionManageComponent } from './admin-user/admin-permission-manage/admin-permission-manage.component';
import { AdminUserCreateComponent } from './admin-user/admin-user-create/admin-user-create.component';
import { AdminStudentlistOne2oneComponent } from './admin-studentlist/admin-studentlist-one2one/admin-studentlist-one2one.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { FilterPipe } from './pipe/filter.pipe';
import { AdminStudentlistCreateComponent } from './admin-studentlist/admin-studentlist-create/admin-studentlist-create.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
      HttpModule,
      ReactiveFormsModule,
      FormsModule
  ],
  declarations: [
    AdminComponent,
    AdminHeaderComponent,
    AdminLeftSideComponent,
    AdminContentComponent,
    AdminFooterComponent,
    AdminControlSidebarComponent,
    AdminDashboard1Component,
    AdminDashboard2Component,
    AdminUserManageComponent,
    AdminRoleManageComponent,
    AdminPermissionManageComponent,
    AdminUserCreateComponent,
    AdminStudentlistOne2oneComponent,
    FilterPipe,
    AdminStudentlistCreateComponent
  ],
  exports: [
      AdminComponent,
      FilterPipe
  ]
})
export class AdminModule { }
