import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {ListService} from "../../../shared/list.service";
import {Http} from "@angular/http";
// Variable in assets/js/scripts.js file
declare var AdminLTE: any;

@Component({
  selector: 'app-admin-studentlist-create',
  templateUrl: './admin-studentlist-create.component.html',
  styleUrls: ['./admin-studentlist-create.component.css']
})
export class AdminStudentlistCreateComponent implements OnInit {

  formModel:FormGroup;

  cteachers: Observable<any>;
  agents: Observable<any>;



  constructor(private listService:ListService, private http: Http) {
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
