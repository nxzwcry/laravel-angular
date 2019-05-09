import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CountMonthComponent} from "./month/month.component";
import {CountTeacherComponent} from "./teacher/teacher.component";

const routes: Routes = [
  { path: 'month', component: CountMonthComponent },
  { path: 'user', component: CountTeacherComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountRoutingModule { }
