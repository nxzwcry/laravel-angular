import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsOneToOneComponent } from './one-to-one/one-to-one.component';
import { StudentsTeamStudentsComponent } from './team-students/team-students.component';
import { StudentsStudentComponent } from './student/student.component';
import { StudentsEditStudentComponent } from './edit-student/edit-student.component';
import {StudentsEditRechargeComponent} from "./edit-recharge/edit-recharge.component";
import {LessonsEditLessonComponent} from "../lessons/edit-lesson/edit-lesson.component";
import {LessonsEditCourseComponent} from "../lessons/edit-course/edit-course.component";

const COMPONENTS = [
  StudentsOneToOneComponent,
  StudentsTeamStudentsComponent,
  StudentsStudentComponent,
];
const COMPONENTS_NOROUNT = [ 
  StudentsEditStudentComponent,
  StudentsEditRechargeComponent,
  LessonsEditLessonComponent,
  LessonsEditCourseComponent,
];

@NgModule({
  imports: [
    SharedModule,
    StudentsRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class StudentsModule { }