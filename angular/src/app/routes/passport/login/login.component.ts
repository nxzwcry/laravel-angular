import { Component, OnDestroy, Inject, Optional } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import {Md5} from "ts-md5/dist/md5";

import {
  TokenService,
  DA_SERVICE_TOKEN,
} from '@delon/auth';
import { ReuseTabService } from '@delon/abc';
import { StartupService } from '@core/startup/startup.service';
import {_HttpClient} from "@delon/theme";
import {JsonData} from "@shared/shared.module";

@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  // providers: [SocialService],
  providers: [],
})
export class UserLoginComponent {
  form: FormGroup;
  error = '';
  type = 0;
  loading = false;

  constructor(
    fb: FormBuilder,
    private router: Router,
    @Optional()
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: TokenService,
    private startupSrv: StartupService,
    private http: _HttpClient,
    private routeInfo: ActivatedRoute
  ) {
    this.form = fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  // region: fields

  get email() {
    return this.form.controls.email;
  }
  get password() {
    return this.form.controls.password;
  }

  // endregion

  switch(ret: any) {
    this.type = ret.index;
  }

  submit() {
    this.error = '';
    if (this.type === 0) {
      this.email.markAsDirty();
      this.email.updateValueAndValidity();
      this.password.markAsDirty();
      this.password.updateValueAndValidity();
      if (this.email.invalid || this.password.invalid) return;
    }

    // **注：** DEMO中使用 `setTimeout` 来模拟 http
    // 默认配置中对所有HTTP请求都会强制[校验](https://ng-alain.com/auth/getting-started) 用户 Token
    // 然一般来说登录请求不需要校验，因此可以在请求URL加上：`/login?_allow_anonymous=true` 表示不触发用户 Token 校验

    this.loading = true;
    let password = Md5.hashStr(this.form.value.password).toString();
    this.http.post<JsonData>('/login', {email:this.form.value.email, password:password})
      .subscribe(
        val => {
          // console.log('post请求成功', val);
          this.tokenService.set({ token: val.data.token });

          // 重新获取 StartupService 内容，若其包括 User 有关的信息的话
          this.startupSrv.load().then(() => this.router.navigate(['/']));
          // 否则直接跳转
          // this.router.navigate([this.routeInfo.snapshot.queryParams["returnUrl"]]);
        },
        error => {
          console.log('post请求失败', error);
          this.loading = false;
          if( error.error.message.email ){
            this.error = error.error.message.email;
          }
          else{
            this.error = error.error.message;
          }
        }
      );
  }

}
