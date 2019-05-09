import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { TeamsRoutingModule } from './teams-routing.module';
import {TeamsListComponent} from "./list/list.component";
import {TeamsTeamComponent} from "./team/team.component";
import {TeamsEditTeamComponent} from "./edit-team/edit-team.component";
import {TeamsAddStudentsComponent} from "./add-students/add-students";

const COMPONENTS = [
  TeamsListComponent,
  TeamsTeamComponent,
];
const COMPONENTS_NOROUNT = [
  TeamsEditTeamComponent,
  TeamsAddStudentsComponent,
];

@NgModule({
  imports: [
    SharedModule,
    TeamsRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class TeamsModule { }
