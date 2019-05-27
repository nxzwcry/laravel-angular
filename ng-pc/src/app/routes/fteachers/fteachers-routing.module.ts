import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FteachersListComponent } from './list/list.component';

const routes: Routes = [

  { path: 'list', component: FteachersListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FteachersRoutingModule { }
