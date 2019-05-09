import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CountRoutingModule } from './count-routing.module';
import {CountMonthComponent} from "./month/month.component";
import {CountTeacherComponent} from "./teacher/teacher.component";

const COMPONENTS = [
  CountMonthComponent,
  CountTeacherComponent,
];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    CountRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class CountModule { }
