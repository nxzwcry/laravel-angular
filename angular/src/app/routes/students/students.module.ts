import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsOneToOneComponent } from './one-to-one/one-to-one.component';
import { StudentsTeamStudentsComponent } from './team-students/team-students.component';
import { StudentsStudentComponent } from './student/student.component';
import { StudentsEditStudentComponent } from './edit-student/edit-student.component';

const COMPONENTS = [
  StudentsOneToOneComponent,
  StudentsTeamStudentsComponent,
  StudentsStudentComponent];
const COMPONENTS_NOROUNT = [ 
  StudentsEditStudentComponent];

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
