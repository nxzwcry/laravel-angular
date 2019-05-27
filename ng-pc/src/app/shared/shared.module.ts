import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// delon
import { AlainThemeModule } from '@delon/theme';
import { DelonABCModule } from '@delon/abc';
import { DelonACLModule } from '@delon/acl';
import { DelonFormModule } from '@delon/form';

// #region third libs
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CountdownModule } from 'ngx-countdown';

// PIPES
import { FilterPipe } from "./pipe/filter.pipe";
import { TransPipe } from "@shared/pipe/trans.pipe";

// COMPONENTS
import { SharedEditLessonNameComponent } from "@shared/components/edit-lesson-name/edit-lesson-name.component";
import { SharedEditLessonScoreComponent } from "@shared/components/edit-lesson-score/edit-lesson-score.component";
import { SharedAddLessonBukeComponent } from "@shared/components/add-lesson-buke/add-lesson-buke.component";
import { SharedEditCourseComponent } from "@shared/components/edit-course/edit-course.component";
import { SharedEditLessonComponent } from "@shared/components/edit-lesson/edit-lesson.component";
import { SharedCopyLessonComponent } from "@shared/components/copy-lesson/copy-lesson.component";

// Services
import { LessonOperateService } from "@shared/services/lesson-operate.service";
import { DictionaryService } from "@shared/services/dictionary.service";
import { CourseOperateService } from "@shared/services/course-operate.service";
import {SharedEditVideoComponent} from "@shared/components/edit-video/edit-video.component";

const THIRDMODULES = [
  NgZorroAntdModule,
  CountdownModule
];
// #endregion

// #region your componets & directives
const COMPONENTS = [
  SharedEditLessonNameComponent,
  SharedEditLessonScoreComponent,
  SharedAddLessonBukeComponent,
  SharedEditCourseComponent,
  SharedEditLessonComponent,
  SharedCopyLessonComponent,
  SharedEditVideoComponent,
];

const DIRECTIVES = [];
// #endregion

const PIPES = [
  FilterPipe,
  TransPipe,
];

const MYSERVICES = [
  DictionaryService,
  LessonOperateService,
  CourseOperateService,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AlainThemeModule.forChild(),
    DelonABCModule,
    DelonACLModule,
    DelonFormModule,
    // third libs
    ...THIRDMODULES
  ],
  declarations: [
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AlainThemeModule,
    DelonABCModule,
    DelonACLModule,
    DelonFormModule,
    // third libs
    ...THIRDMODULES,
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES
  ],
  providers:[
    ...MYSERVICES,
  ],
  entryComponents:[
    ...COMPONENTS,
  ]
})
export class SharedModule { }

export class JsonData {
  data: any;
  count: any;
}
