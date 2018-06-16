import { Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {environment} from '../../environments/environment';
import {AuthService} from "./auth.service";

/**
 * HTTP拦截器,设置头部信息
 */
@Injectable()
export class AuthHttpInterceptorService implements HttpInterceptor {

  authService: AuthService;
  skipAuth: [string];
  constructor(private inject: Injector) {
    // 用户登录或认证请求则不需要添加头部AccessToken信息
    this.skipAuth = [
      `${environment.serverUrl}/api/login`,
      `${environment.serverUrl}/api/passwordreset`,
    ];
  }
  /**
   * 拦截器拦截请求
   * @param {HttpRequest<any>} req
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<any>>}
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService = this.inject.get(AuthService);// 注意此句
    const req_started = Date.now();
    let authReq;
    /**
     * 如果是跳过认证的链接，则不添加头部信息
     */
    if (this.isSkipAuth(req.url)) {
      authReq = req.clone();
    }else {
      const access_token = `Bearer ${this.authService.getToken()}`;
      authReq = req.clone({
        setHeaders: {
          Authorization: access_token
        }
      });
    }
    return next.handle(authReq).do(event => {
      if (event instanceof HttpResponse) {
        const elapsed = Date.now() - req_started;
        console.log(`Request for ${req.urlWithParams} took ${elapsed} ms`);
      }
    });
  }
  /*
   *是否跳过添加头部认证
  */
  isSkipAuth(url: string) {
    let isMatch = false;
    this.skipAuth.forEach((reg_url: string) => {
      if ( !isMatch) {
        if (url.search(reg_url) >= 0) {
          isMatch = true;
        }
      }
    });
    return isMatch;
  }
}