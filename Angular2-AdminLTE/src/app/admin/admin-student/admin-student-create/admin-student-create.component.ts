import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {ListService} from "../../../shared/list.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
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

  disable: boolean;

  constructor(private listService:ListService, private http: HttpClient, private router: Router) {
    this.disable = false;
    let fb = new FormBuilder();
    this.formModel = fb.group({
      name: ['', [Validators.required]],
      ename: [null],
      sex: ['', [Validators.required]],
      birthday: [null],
      grade: ['', [Validators.required]],
      cteacher_user_id:['0'],
      agent_user_id:['0'],
      email: [null],
      address: [null],
      desc: ['']
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
      this.http.post<StudentResponse>('api/students', this.formModel.value)
        .subscribe(
        (val) => {
          console.log('post请求成功', val);

          // 创建成功后跳转到学生信息页面
          this.router.navigate(['/admin/student', val.id]);
        },
        error => {
          console.log('post请求失败', error);
          this.disable = false;
        }
      );
      this.disable = true;
    }
  }
}

interface StudentResponse {
  id: string;
}