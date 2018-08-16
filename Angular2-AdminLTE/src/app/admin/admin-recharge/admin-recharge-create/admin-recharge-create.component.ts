import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ListService} from "../../../shared/list.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {StatusService, Student} from "../../../shared/status.service";
// Variable in assets/js/scripts.js file
declare var AdminLTE: any;

@Component({
  selector: 'app-admin-recharge-create',
  templateUrl: './admin-recharge-create.component.html',
  styleUrls: ['./admin-recharge-create.component.css']
})
export class AdminRechargeCreateComponent implements OnInit {

  formModel:FormGroup;

  // dataSource:Observable<any>;

  // private studentId:number;

  agents: Observable<any>;
  student: Student;
  disable: boolean;

  constructor(private routeInfo: ActivatedRoute,
              private listService:ListService,
              private http: HttpClient,
              private router: Router,
              private status: StatusService
  ) {
    this.disable = false;
    //
    // this.studentId = this.routeInfo.snapshot.params["id"];
    //
    // this.dataSource = this.http.get(`/api/students/${this.studentId}`);

    let fb = new FormBuilder();
    this.formModel = fb.group({
        student_id: [null, [Validators.required]],
        waijiao: ['0', [Validators.required]],
        zhongjiao: ['0', [Validators.required]],
        jingpin: ['0', [Validators.required]],
        money: ['0', [Validators.required]],
        user_id: ['0', [Validators.required]],
        note: [null],
      }
    );

  }

  ngOnInit() {
    // Actualiza la barra latera y el footer
    AdminLTE.init();
    this.student = this.status.getStudent();
    // this.dataSource.subscribe(
    //   (data) => {
    //     this.student = data.data;
    //   }
    // );

    this.listService.getAgents().subscribe(
      (data) => this.agents = data.data
    );
  }

  onSubmit() {
    // this.formModel.setValue({
    //   student_id: this.student.id,
    // });
    this.formModel.patchValue({student_id: `${this.student.id}`});
    if(this.formModel.valid) {
      console.log(this.formModel.value);
      this.http.post('api/recharges', this.formModel.value)
        .subscribe(
          (val) => {
            console.log('post请求成功', val);

            // 创建成功后跳转到学生信息页面
            this.router.navigate(['/admin/recharge_list', this.student.id]);
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

