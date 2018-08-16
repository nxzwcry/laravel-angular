import { AdminRoutingModule } from './admin-routing/admin-routing.module';
import { AdminControlSidebarComponent } from './admin-control-sidebar/admin-control-sidebar.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { AdminLeftSideComponent } from './admin-left-side/admin-left-side.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUserManageComponent } from './admin-user/admin-user-manage/admin-user-manage.component';
import { AdminRoleManageComponent } from './admin-user/admin-role-manage/admin-role-manage.component';
import { AdminPermissionManageComponent } from './admin-user/admin-permission-manage/admin-permission-manage.component';
import { AdminUserCreateComponent } from './admin-user/admin-user-create/admin-user-create.component';
import { AdminStudentlistOne2oneComponent } from './admin-studentlist/admin-studentlist-one2one/admin-studentlist-one2one.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FilterPipe } from './pipe/filter.pipe';
import { AdminStudentCreateComponent } from './admin-student/admin-student-create/admin-student-create.component';
import { HttpClientModule } from "@angular/common/http";
import { AdminTeamListComponent } from './admin-team/admin-team-list/admin-team-list.component';
import { AdminTeamCreateComponent } from './admin-team/admin-team-create/admin-team-create.component';
import { AdminStudentlistTeamComponent } from './admin-studentlist/admin-studentlist-team/admin-studentlist-team.component';
import { AdminStudentlistStoppedComponent } from './admin-studentlist/admin-studentlist-stopped/admin-studentlist-stopped.component';
import { AdminCourseViewComponent } from './admin-course/admin-course-view/admin-course-view.component';
import { AdminStudentShowComponent } from './admin-student/admin-student-show/admin-student-show.component';
import { AdminStudentChangeComponent } from './admin-student/admin-student-change/admin-student-change.component';
import {TransPipe} from "./pipe/trans.pipe";
import { AdminRechargeListComponent } from './admin-recharge/admin-recharge-list/admin-recharge-list.component';
import { AdminRechargeShowComponent } from './admin-recharge/admin-recharge-show/admin-recharge-show.component';
import { AdminRechargeCreateComponent } from './admin-recharge/admin-recharge-create/admin-recharge-create.component';
import { AdminRechargeChangeComponent } from './admin-recharge/admin-recharge-change/admin-recharge-change.component';
import { AdminLessonCreateComponent } from './admin-lesson/admin-lesson-create/admin-lesson-create.component';
import { AdminLessonFutureComponent } from './admin-lesson/admin-lesson-future/admin-lesson-future.component';
import { AdminLessonOldComponent } from './admin-lesson/admin-lesson-old/admin-lesson-old.component';
import { AdminCourseCreateComponent } from './admin-course/admin-course-create/admin-course-create.component';
import { AdminLessonDemoComponent } from './admin-lesson/admin-lesson-demo/admin-lesson-demo.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
      ReactiveFormsModule,
      FormsModule
  ],
  declarations: [
    AdminComponent,
    AdminHeaderComponent,
    AdminLeftSideComponent,
    // AdminContentComponent,
    AdminFooterComponent,
    AdminControlSidebarComponent,
    // AdminDashboard1Component,
    // AdminDashboard2Component,
    AdminUserManageComponent,
    AdminRoleManageComponent,
    AdminPermissionManageComponent,
    AdminUserCreateComponent,
    AdminStudentlistOne2oneComponent,
    FilterPipe,
    TransPipe,
    AdminStudentCreateComponent,
    AdminTeamListComponent,
    AdminTeamCreateComponent,
    AdminStudentlistTeamComponent,
    AdminStudentlistStoppedComponent,
    AdminCourseViewComponent,
    AdminStudentShowComponent,
    AdminStudentChangeComponent,
    AdminRechargeListComponent,
    AdminRechargeShowComponent,
    AdminRechargeCreateComponent,
    AdminRechargeChangeComponent,
    AdminLessonCreateComponent,
    AdminLessonFutureComponent,
    AdminLessonOldComponent,
    AdminCourseCreateComponent,
    AdminLessonDemoComponent,
  ],
  exports: [
      AdminComponent,
      FilterPipe,
    TransPipe
  ]
})
export class AdminModule { }
