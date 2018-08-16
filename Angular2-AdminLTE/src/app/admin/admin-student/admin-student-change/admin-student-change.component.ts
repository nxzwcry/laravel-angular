import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {ListService} from "../../../shared/list.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
// Variable in assets/js/scripts.js file
declare var AdminLTE: any;

@Component({
  selector: 'app-admin-student-change',
  templateUrl: './admin-student-change.component.html',
  styleUrls: ['./admin-student-change.component.css']
})
export class AdminStudentChangeComponent implements OnInit {

  formModel:FormGroup;

  cteachers: Observable<any>;
  agents: Observable<any>;

  dataSource:Observable<any>;

  private studentId:number;

  student: any;
  disable: boolean;

  constructor(private routeInfo: ActivatedRoute, private listService:ListService, private http: HttpClient, private router: Router) {
    this.disable = false;

    this.studentId = this.routeInfo.snapshot.params["id"];

    this.dataSource = this.http.get(`/api/students/${this.studentId}`);

    let fb = new FormBuilder();
    this.formModel = fb.group({
        name: [null, [Validators.required]],
        ename: [null],
        sex: [null, [Validators.required]],
        birthday: [null],
        grade: [null, [Validators.required]],
        cteacher_user_id:[null],
        agent_user_id:[null],
        email: [null],
        address: [null],
        desc: [null]
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

    this.dataSource.subscribe(
      (data) => {
        this.student = data.data;
        this.formModel.setValue({
          name: this.student.name,
          ename: this.student.ename,
          sex: this.student.sex,
          birthday: this.student.birthday,
          grade: this.student.grade,
          cteacher_user_id: this.student.cteacher_user_id,
          agent_user_id: this.student.agent_user_id,
          email: this.student.email,
          address: this.student.address,
          desc: this.student.desc,
        });
      }
    );

  }

  onSubmit() {
    if (this.formModel.dirty)
    {
      if (this.formModel.valid) {
        this.disable = true;
        // console.log(this.formModel.value);
        this.http.put('api/students/'+this.studentId, this.formModel.value)
          .subscribe(
            val => {
              console.log('post请求成功', val);
              // 登录成功后跳转到登录前的页面
              this.router.navigate(['/admin/student', this.studentId]);
            },
            error => {
              console.log('post请求失败', error);
              this.disable = false;
            }
          );
      }
    }
    else{
      this.router.navigate(['/admin/student', this.studentId]);
    }
  }

}
