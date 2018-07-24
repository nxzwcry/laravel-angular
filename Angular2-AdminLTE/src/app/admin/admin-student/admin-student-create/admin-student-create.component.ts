import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {ListService} from "../../../shared/list.service";
import {HttpClient} from "@angular/common/http";
// Variable in assets/js/scripts.js file
declare var AdminLTE: any;

@Component({
  selector: 'app-admin-student-create',
  templateUrl: './admin-student-create.component.html',
  styleUrls: ['./admin-student-create.component.css']
})
export class AdminStudentCreateComponent implements OnInit {

  formModel:FormGroup;

  cteachers: Observable<any>;
  agents: Observable<any>;



  constructor(private listService:ListService, private http: HttpClient) {
    let fb = new FormBuilder();
    this.formModel = fb.group({
      name: ['', [Validators.required]],
      ename: [''],
      cteacher_user_id:['0'],
      agent_user_id:['0'],
      }
    );
  }

  ngOnInit() {
    // Actualiza la barra latera y el footer
    AdminLTE.init();
    this.listService.getCteachers().subscribe(
      (data) => this.cteachers = data.data
    );
    this.listService.getAgents().subscribe(
      (data) => this.agents = data.data
    );
  }

  onSubmit() {
    if(this.formModel.valid) {
      // console.log(this.formModel.value);
      this.http.post('api/students', this.formModel.value)
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
