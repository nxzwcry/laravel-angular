import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsOneToOneComponent } from './one-to-one/one-to-one.component';
import { StudentsTeamStudentsComponent } from './team-students/team-students.component';
import { StudentsStudentComponent } from './student/student.component';

const COMPONENTS = [
  StudentsOneToOneComponent,
  StudentsTeamStudentsComponent];
const COMPONENTS_NOROUNT = [
  StudentsStudentComponent];

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
