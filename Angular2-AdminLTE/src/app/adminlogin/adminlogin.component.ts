import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Md5} from "ts-md5/dist/md5";
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  formModel:FormGroup;

  constructor(private router: Router, private routeInfo: ActivatedRoute, private http: HttpClient, private auth:AuthService) {
    let fb = new FormBuilder();
    this.formModel = fb.group({
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
      }
    );}

  ngOnInit() {
  }

  onSubmit() {
    if(this.formModel.valid) {
      // console.log(this.formModel.value);
      let password = Md5.hashStr(this.formModel.value.password).toString();
      // let password = this.formModel.value.password;
      this.http.post('api/login', {email:this.formModel.value.email, password:password})
        .subscribe(
          val => {
            console.log('post请求成功', val);
            this.auth.setToken(val['data'].token);
            // 登录成功后跳转到登录前的页面
            this.router.navigate([this.routeInfo.snapshot.queryParams["returnUrl"]]);
          },
          error => {
            console.log('post请求失败', error);
          }
        );
    }
  }

}
