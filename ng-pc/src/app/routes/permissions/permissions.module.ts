import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { PermissionsRoutingModule } from './permissions-routing.module';
import { PermissionsPermissionListComponent } from './permission-list/permission-list.component';
import { PermissionsRoleListComponent } from './role-list/role-list.component';
import {PermissionsAddComponent} from "./add/add.component";
import {PermissionsAddPermissionToRoleComponent} from "./add-permission-to-role/add-permission-to-role.component";

const COMPONENTS = [
  PermissionsPermissionListComponent,
  PermissionsRoleListComponent];
const COMPONENTS_NOROUNT = [
  PermissionsAddComponent,
  PermissionsAddPermissionToRoleComponent,
];

@NgModule({
  imports: [
    SharedModule,
    PermissionsRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class PermissionsModule { }
