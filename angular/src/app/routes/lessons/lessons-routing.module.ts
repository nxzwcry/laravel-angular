import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LessonsFutureComponent} from "./future/future.component";
import {LessonsPassedComponent} from "./passed/passed.component";
import {LessonsLeaveComponent} from "./leave/leave.component";
import {LessonsCourseListComponent} from "./course-list/course-list.component";
import {LessonsLessonComponent} from "./lesson/lesson.component";
import {LessonsCourseComponent} from "./course/course.component";
import {LessonsConfirmComponent} from "./confirm/confirm.component";

const routes: Routes = [
  { path: 'future', component: LessonsFutureComponent },
  { path: 'passed', component: LessonsPassedComponent },
  { path: 'leave', component: LessonsLeaveComponent },
  { path: 'confirm', component: LessonsConfirmComponent },
  { path: 'course-list', component: LessonsCourseListComponent },
  { path: 'lesson/:id', component: LessonsLessonComponent },
  { path: 'course/:id', component: LessonsCourseComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LessonsRoutingModule { }
