import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionsPermissionListComponent } from './permission-list/permission-list.component';
import { PermissionsRoleListComponent } from './role-list/role-list.component';

const routes: Routes = [

  { path: 'permission-list', component: PermissionsPermissionListComponent },
  { path: 'role-list', component: PermissionsRoleListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionsRoutingModule { }
