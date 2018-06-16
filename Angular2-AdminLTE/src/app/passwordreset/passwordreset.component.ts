import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Md5} from "ts-md5/dist/md5";

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.css']
})
export class PasswordresetComponent implements OnInit {

  private token:string;
  formModel:FormGroup;

  constructor(private routeInfo: ActivatedRoute, private http: HttpClient) {
    let fb = new FormBuilder();
    this.formModel = fb.group({
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
      password_confirmation: ['', [Validators.required]],
      }
    );
  }

  ngOnInit() {
    this.token=this.routeInfo.snapshot.params["token"];
  }

  onSubmit() {
    if(this.formModel.valid) {
      // console.log(this.formModel.value);
      let password = Md5.hashStr(this.formModel.value.password).toString();
      // let password = this.formModel.value.password;
      this.http.post('api/passwordreset', {email:this.formModel.value.email, password:password, password_confirmation:password, token:this.token})
        .subscribe(
          val => {
            console.log('post请求成功', val);
          },
          error => {
            console.log('post请求失败', error);
          }
        );
    }
  }

}
