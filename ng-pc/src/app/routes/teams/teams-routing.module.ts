import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TeamsListComponent} from "./list/list.component";
import {TeamsTeamComponent} from "./team/team.component";

const routes: Routes = [
  { path: 'list', component: TeamsListComponent },
  { path: 'team/:id', component: TeamsTeamComponent , data: { reuse: true } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule { }
