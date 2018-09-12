import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// delon
import { AlainThemeModule } from '@delon/theme';
import { DelonABCModule } from '@delon/abc';
import { DelonACLModule } from '@delon/acl';
import { DelonFormModule } from '@delon/form';

// region: third libs
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CountdownModule } from 'ngx-countdown';
import {FilterPipe} from "./pipe/filter.pipe";
import {TransPipe} from "@shared/pipe/trans.pipe";
import {SharedEditLessonNameComponent} from "@shared/components/edit-lesson-name/edit-lesson-name.component";
import {SharedEditLessonScoreComponent} from "@shared/components/edit-lesson-score/edit-lesson-score.component";
import {LessonOperateService} from "@shared/services/lesson-operate.service";
import {DictionaryService} from "@shared/services/dictionary.service";

const THIRDMODULES = [
  NgZorroAntdModule,
  CountdownModule
];
// endregion

// region: your componets & directives
const COMPONENTS = [
  SharedEditLessonNameComponent,
  SharedEditLessonScoreComponent,
];
const DIRECTIVES = [];
// endregion


const PIPES = [
  FilterPipe,
  TransPipe,
];

const MYSERVICES = [
  DictionaryService,
  LessonOperateService,
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
    ...THIRDMODULES,
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
}