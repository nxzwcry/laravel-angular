import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ListService} from "../../../shared/list.service";
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {StatusService, Student} from "../../../shared/status.service";

// Variable in assets/js/scripts.js file
declare var AdminLTE: any;

@Component({
  selector: 'app-admin-lesson-create',
  templateUrl: './admin-lesson-create.component.html',
  styleUrls: ['./admin-lesson-create.component.css']
})
export class AdminLessonCreateComponent implements OnInit {

  formModel:FormGroup;
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
    this.student = this.status.getStudent();
    let fb = new FormBuilder();
    this.formModel = fb.group({
        student_id: [this.student.id, [Validators.required]],
        waijiao: ['0', [Validators.required]],
        zhongjiao: ['0', [Validators.required]],
        jingpin: ['0', [Validators.required]],
        money: ['0', [Validators.required]],
        user_id: [this.student.agent_user_id, [Validators.required]],
        note: [null],
      }
    );

  }
  ngOnInit() {
    // Actualiza la barra latera y el footer
    AdminLTE.init();
    this.listService.getAgents().subscribe(
      (data) => this.agents = data.data
    );
  }

  onSubmit() {
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
