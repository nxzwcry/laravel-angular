import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import {_HttpClient, ModalHelper} from '@delon/theme';
import {ReuseTabService} from "@delon/abc";
import {JsonData} from "@shared/shared.module";
import {Student} from "@shared/modules/student";
import {DictionaryService} from "@shared/services/dictionary.service";
import {UsersEditUserComponent} from "../../users/edit-user/edit-user.component";
import {StudentsEditStudentComponent} from "../edit-student/edit-student.component";
import {StudentsEditRechargeComponent} from "../edit-recharge/edit-recharge.component";
import {LessonsEditLessonComponent} from "../../lessons/edit-lesson/edit-lesson.component";
import {LessonsEditCourseComponent} from "../../lessons/edit-course/edit-course.component";

@Component({
  selector: 'app-students-student',
  templateUrl: './student.component.html',
})
export class StudentsStudentComponent implements OnInit {
  id = this.route.snapshot.params.id;
  student: Student;
  dowList: Array<any>;

  constructor(
    private route: ActivatedRoute,
    public msgSrv: NzMessageService,
    public http: _HttpClient,
    private reuseTabService: ReuseTabService,
    private dic: DictionaryService,
    private modal: ModalHelper,
  ) { }

  ngOnInit(): void {
    this.dowList = this.dic.getDowList();
    this.load();
  }

  change(){
    this.modal.create(
      StudentsEditStudentComponent,
      {size: 'sm'},
      {modalOptions:
          {
            nzTitle: '修改学生信息',
            nzComponentParams: {id: this.id}
          }
      }).subscribe(res => this.reload(res) );
  }

  createRecharge() {
    this.modal.create(
      StudentsEditRechargeComponent,
      {size: 'sm'},
      {modalOptions:
          {
            nzTitle: `${this.student.name}-购课充值`,
            nzComponentParams: {userId: this.id}
          }
      }).subscribe(res => this.reload(res) );
  }

  createLesson() {
    this.modal.create(
      LessonsEditLessonComponent,
      {size: 'sm'},
      {modalOptions:
          {
            nzTitle: `${this.student.name}-安排单节课程`,
            nzComponentParams: {userId: this.id}
          }
      }).subscribe(res => this.reload(res) );
  }

  createCourse() {
    this.modal.create(
      LessonsEditCourseComponent,
      {size: 'sm'},
      {modalOptions:
          {
            nzTitle: `${this.student.name}-安排固定课程`,
            nzComponentParams: {userId: this.id}
          }
      }).subscribe(res => this.reload(res) );
  }

  reload(b: Boolean) {
    if(b) this.load();
  }

  load() {
    this.http.get<JsonData>(`/students/${this.id}`)
      .subscribe(res =>
      {
        this.student = res.data;
        this.reuseTabService.title = this.student.name;
        this.student.sex = this.dic.getSex(this.student.sex);
        this.student.grade = this.dic.getGrade(this.student.grade);
      });
  }
}
