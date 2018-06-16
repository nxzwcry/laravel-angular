import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StarterComponent } from './starter/starter.component';
import { StarterHeaderComponent } from './starter/starter-header/starter-header.component';
import { StarterLeftSideComponent } from './starter/starter-left-side/starter-left-side.component';
import { StarterContentComponent } from './starter/starter-content/starter-content.component';
import { StarterFooterComponent } from './starter/starter-footer/starter-footer.component';
import { StarterControlSidebarComponent } from './starter/starter-control-sidebar/starter-control-sidebar.component';
import {ListService} from "./shared/list.service";
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SessionStorageService} from "./shared/session-storage.service";
import {AuthService} from "./shared/auth.service";
import {AuthHttpInterceptorService} from "./shared/auth-http-interceptor.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    StarterComponent,
    StarterHeaderComponent,
    StarterLeftSideComponent,
    StarterContentComponent,
    StarterFooterComponent,
    StarterControlSidebarComponent,
    AdminloginComponent,
    PasswordresetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    ListService,
    SessionStorageService,
    AuthService,
    {provide:HTTP_INTERCEPTORS, useClass:AuthHttpInterceptorService, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
