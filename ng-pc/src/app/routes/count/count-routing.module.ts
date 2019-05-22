import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CountMonthComponent} from "./month/month.component";
import {CountTeacherComponent} from "./teacher/teacher.component";
import {CountYearComponent} from "./year/year.component";

const routes: Routes = [
  { path: 'month', component: CountMonthComponent },
  { path: 'user', component: CountTeacherComponent },
  { path: 'year', component: CountYearComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountRoutingModule { }
