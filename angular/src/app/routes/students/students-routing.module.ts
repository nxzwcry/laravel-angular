import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentsOneToOneComponent } from './one-to-one/one-to-one.component';
import { StudentsTeamStudentsComponent } from './team-students/team-students.component';
import { StudentsStudentComponent } from './student/student.component';
import {StudentsStopedStudentsComponent} from "./stoped-students/stoped-students.component";
import {StudentsNoLessonsStudentsComponent} from "./no-lessons-students/no-lessons-students.component";

const routes: Routes = [

  { path: 'one-to-one', component: StudentsOneToOneComponent },
  { path: 'team-students', component: StudentsTeamStudentsComponent },
  { path: 'stoped', component: StudentsStopedStudentsComponent },
  { path: 'no-lessons', component: StudentsNoLessonsStudentsComponent },
  { path: 'student/:id', component: StudentsStudentComponent , data: { reuse: true } },
  ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
