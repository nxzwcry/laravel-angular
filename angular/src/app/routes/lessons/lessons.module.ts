import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { LessonsRoutingModule } from './lessons-routing.module';
import {LessonsEditLessonComponent} from "./edit-lesson/edit-lesson.component";
import {LessonsEditCourseComponent} from "./edit-course/edit-course.component";

const COMPONENTS = [];
const COMPONENTS_NOROUNT = [
  LessonsEditLessonComponent,
  LessonsEditCourseComponent,
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
