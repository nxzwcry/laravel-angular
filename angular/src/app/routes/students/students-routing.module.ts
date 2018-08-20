import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentsOneToOneComponent } from './one-to-one/one-to-one.component';
import { StudentsTeamStudentsComponent } from './team-students/team-students.component';

const routes: Routes = [

  { path: 'one-to-one', component: StudentsOneToOneComponent },
  { path: 'team-students', component: StudentsTeamStudentsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
