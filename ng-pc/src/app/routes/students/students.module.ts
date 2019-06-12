import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsOneToOneComponent } from './one-to-one/one-to-one.component';
import { StudentsTeamStudentsComponent } from './team-students/team-students.component';
import { StudentsStudentComponent } from './student/student.component';
import {StudentsEditRechargeComponent} from "./edit-recharge/edit-recharge.component";
import {StudentsStopedStudentsComponent} from "./stoped-students/stoped-students.component";
import {StudentsNoLessonsStudentsComponent} from "./no-lessons-students/no-lessons-students.component";

const COMPONENTS = [
  StudentsOneToOneComponent,
  StudentsTeamStudentsComponent,
  StudentsStudentComponent,
  StudentsStopedStudentsComponent,
  StudentsNoLessonsStudentsComponent,
];
const COMPONENTS_NOROUNT = [
  StudentsEditRechargeComponent,
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
