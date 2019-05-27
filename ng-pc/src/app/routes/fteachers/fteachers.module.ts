import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { FteachersRoutingModule } from './fteachers-routing.module';
import { FteachersListComponent } from './list/list.component';
import { FteachersEditFteacherComponent } from "./edit-fteacher/edit-fteacher.component";

const COMPONENTS = [
  FteachersListComponent];
const COMPONENTS_NOROUNT = [
  FteachersEditFteacherComponent,
];

@NgModule({
  imports: [
    SharedModule,
    FteachersRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class FteachersModule { }
