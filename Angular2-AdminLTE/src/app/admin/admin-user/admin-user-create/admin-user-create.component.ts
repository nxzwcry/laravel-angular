import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
// Variable in assets/js/scripts.js file
declare var AdminLTE: any;

@Component({
    selector: 'app-admin-user-create',
    templateUrl: './admin-user-create.component.html',
    styleUrls: ['./admin-user-create.component.css']
})
export class AdminUserCreateComponent implements OnInit {

  formModel:FormGroup;

    constructor(private http: HttpClient) {
      let fb = new FormBuilder();
      this.formModel = fb.group({
          email: ['', [Validators.required]],
          name: ['', [Validators.required]],
        }
      );
    }

    ngOnInit() {
        // Actualiza la barra latera y el footer
        AdminLTE.init();
    }

  onSubmit() {
    if(this.formModel.valid) {
      // console.log(this.formModel.value);
      this.http.post('api/users', this.formModel.value)
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
