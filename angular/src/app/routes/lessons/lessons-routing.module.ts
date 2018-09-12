import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LessonsFutureComponent} from "./future/future.component";
import {LessonsPassedComponent} from "./passed/passed.component";
import {LessonsLeaveComponent} from "./leave/leave.component";

const routes: Routes = [
  { path: 'future', component: LessonsFutureComponent },
  { path: 'passed', component: LessonsPassedComponent },
  { path: 'leave', component: LessonsLeaveComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LessonsRoutingModule { }
