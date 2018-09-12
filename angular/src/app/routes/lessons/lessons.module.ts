import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { LessonsRoutingModule } from './lessons-routing.module';
import {LessonsFutureComponent} from "./future/future.component";
import {LessonsPassedComponent} from "./passed/passed.component";
import {LessonsEditLessonNameComponent} from "./edit-lesson-name/edit-lesson-name.component";
import {LessonsEditLessonScoreComponent} from "./edit-lesson-score/edit-lesson-score.component";
import {LessonsLeaveComponent} from "./leave/leave.component";

const COMPONENTS = [
  LessonsFutureComponent,
  LessonsPassedComponent,
  LessonsLeaveComponent,
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
