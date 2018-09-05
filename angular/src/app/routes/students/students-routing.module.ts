import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentsOneToOneComponent } from './one-to-one/one-to-one.component';
import { StudentsTeamStudentsComponent } from './team-students/team-students.component';
import { StudentsStudentComponent } from './student/student.component';
import {StudentsTeamsComponent} from "./teams/teams.component";

const routes: Routes = [

  { path: 'one-to-one', component: StudentsOneToOneComponent },
  { path: 'teams', component: StudentsTeamsComponent },
  { path: 'team-students', component: StudentsTeamStudentsComponent },
  { path: 'student/:id', component: StudentsStudentComponent , data: { reuse: true } },
  ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
