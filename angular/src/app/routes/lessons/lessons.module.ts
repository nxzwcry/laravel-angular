import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { LessonsRoutingModule } from './lessons-routing.module';

const COMPONENTS = [];
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
