import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { JsonData } from "@shared/shared.module";
import { _HttpClient } from "@delon/theme";
import { Md5 } from "ts-md5/dist/md5";

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.less'],
})
export class ResetPasswordComponent implements OnDestroy {
  form: FormGroup;
  error = '';
  type = 0;
  loading = false;
  visible = false;
  status = 'pool';
  progress = 0;
  passwordProgressMap = {
    ok: 'success',
    pass: 'normal',
    pool: 'exception',
  };
  resetToken = this.route.snapshot.params.token;

  constructor(
    fb: FormBuilder,
    private router: Router,
    public msg: NzMessageService,
    public http: _HttpClient,
    private route: ActivatedRoute,
  ) {
    this.form = fb.group({
      mail: [null, [Validators.email]],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          ResetPasswordComponent.checkPassword.bind(this),
        ],
      ],
      confirm: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          ResetPasswordComponent.passwordEquar,
        ],
      ],
    });
  }

  ngOnInit(): void { }

  static checkPassword(control: FormControl) {
    if (!control) return null;
    const self: any = this;
    self.visible = !!control.value;
    if (control.value && control.value.length > 9) self.status = 'ok';
    else if (control.value && control.value.length > 5) self.status = 'pass';
    else self.status = 'pool';

    if (self.visible)
      self.progress =
        control.value.length * 10 > 100 ? 100 : control.value.length * 10;
  }

  static passwordEquar(control: FormControl) {
    if (!control || !control.parent) return null;
    if (control.value !== control.parent.get('password').value) {
      return { equar: true };
    }
    return null;
  }

  // region: fields

  get mail() {
    return this.form.controls.mail;
  }
  get password() {
    return this.form.controls.password;
  }
  get confirm() {
    return this.form.controls.confirm;
  }

  // endregion

  submit() {
    this.error = '';
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
    if (this.form.invalid) return;

    this.loading = true;
    let password = Md5.hashStr(this.form.value.password).toString();
    this.http.post<JsonData>('/passwordreset?_allow_anonymous=true', {email: this.form.value.mail, password: password, password_confirmation: password, token: this.resetToken})
      .subscribe(
        val => {
          this.router.navigate(['/passport/login']);
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

  ngOnDestroy(): void {}
}
