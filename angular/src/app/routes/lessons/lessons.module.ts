import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { LessonsRoutingModule } from './lessons-routing.module';
import {LessonsFutureComponent} from "./future/future.component";
import {LessonsPassedComponent} from "./passed/passed.component";
import {LessonsLeaveComponent} from "./leave/leave.component";
import {LessonsCourseListComponent} from "./course-list/course-list.component";
import {LessonsLessonComponent} from "./lesson/lesson.component";
import {LessonsCourseComponent} from "./course/course.component";
import {LessonsConfirmComponent} from "./confirm/confirm.component";
import {LessonsDayListComponent} from "./day-list/day-list.component";

const COMPONENTS = [
  LessonsFutureComponent,
  LessonsPassedComponent,
  LessonsLeaveComponent,
  LessonsCourseListComponent,
  LessonsLessonComponent,
  LessonsCourseComponent,
  LessonsConfirmComponent,
  LessonsDayListComponent,
];
const COMPONENTS_NOROUNT = [
];

@NgModule({
  imports: [
    SharedModule,
    LessonsRoutingModule,
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class LessonsModule { }
