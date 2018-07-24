import { AdminRoutingModule } from './admin-routing/admin-routing.module';
// import { AdminDashboard1Component } from './admin-dashboard1/admin-dashboard1.component';
import { AdminControlSidebarComponent } from './admin-control-sidebar/admin-control-sidebar.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
// import { AdminContentComponent } from './admin-content/admin-content.component';
import { AdminLeftSideComponent } from './admin-left-side/admin-left-side.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { AdminDashboard2Component } from './admin-dashboard2/admin-dashboard2.component';
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
import { AdminCourseTeacherComponent } from './admin-course/admin-course-teacher/admin-course-teacher.component';
import { AdminCourseDemoComponent } from './admin-course/admin-course-demo/admin-course-demo.component';
import { AdminCourseViewComponent } from './admin-course/admin-course-view/admin-course-view.component';
import { AdminCourseLessonsComponent } from './admin-course/admin-course-lessons/admin-course-lessons.component';
import { AdminCourseVideosComponent } from './admin-course/admin-course-videos/admin-course-videos.component';
import { AdminStudentShowComponent } from './admin-student/admin-student-show/admin-student-show.component';
import { AdminStudentChangeComponent } from './admin-student/admin-student-change/admin-student-change.component';

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
    AdminStudentCreateComponent,
    AdminTeamListComponent,
    AdminTeamCreateComponent,
    AdminStudentlistTeamComponent,
    AdminStudentlistStoppedComponent,
    AdminCourseTeacherComponent,
    AdminCourseDemoComponent,
    AdminCourseViewComponent,
    AdminCourseLessonsComponent,
    AdminCourseVideosComponent,
    AdminStudentShowComponent,
    AdminStudentChangeComponent,
  ],
  exports: [
      AdminComponent,
      FilterPipe
  ]
})
export class AdminModule { }
