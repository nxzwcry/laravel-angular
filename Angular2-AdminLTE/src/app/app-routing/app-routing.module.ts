// import { AdminDashboard2Component } from './../admin/admin-dashboard2/admin-dashboard2.component';
// import { AdminDashboard1Component } from './../admin/admin-dashboard1/admin-dashboard1.component';
// import { StarterComponent } from './../starter/starter.component';
// import { AdminComponent } from './../admin/admin.component';
import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {AdminloginComponent} from "../adminlogin/adminlogin.component";
import {PasswordresetComponent} from "../passwordreset/passwordreset.component";

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: 'admin', pathMatch: 'full' },
      // { path: 'starter', component: StarterComponent },
      { path: 'adminlogin', component: AdminloginComponent },
      { path: 'passwordreset/:token', component: PasswordresetComponent },
    ])
  ],
  declarations: [],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
