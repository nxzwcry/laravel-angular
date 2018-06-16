import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthService} from "../shared/auth.service";
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('AuthGuard#canActivate called');
    if (this.checkLogin()) {
      // 已登录，返回Ture
      console.log("AuthGuard: 用户已登陆。");
      return true;
    }
    // 未登陆，重定向URL到登录页面，包含返回URL参数，然后返回False
    this.router.navigate(['/adminlogin'], { queryParams: { returnUrl: state.url }});
    return false;
  }
  private checkLogin(): boolean {
    //随机返回Ture /False
    // let loggedIn:boolean = Math.random() < 0.5;
    // if(!loggedIn){
    //   console.log("AuthGuard: 用户未登陆。");
    // }
    // return loggedIn;
    if(this.auth.getToken()){
      return true;
    }
    else{
      return false;
    }
  }
}
