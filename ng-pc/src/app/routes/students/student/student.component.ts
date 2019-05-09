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
import {LessonOperateService} from "@shared/services/lesson-operate.service";
import {CourseOperateService} from "@shared/services/course-operate.service";
import {SharedEditLessonComponent} from "@shared/components/edit-lesson/edit-lesson.component";
import {SharedEditCourseComponent} from "@shared/components/edit-course/edit-course.component";

@Component({
  selector: 'app-students-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentsStudentComponent implements OnInit {
  id = this.route.snapshot.params.id;
  student: Student;
  dowList: Array<any>;
  lessonStatusList: Array<any>;
  indexTab: number;

  constructor(
    private route: ActivatedRoute,
    public msgSrv: NzMessageService,
    public http: _HttpClient,
    private reuseTabService: ReuseTabService,
    private dic: DictionaryService,
    private modal: ModalHelper,
    private lessonOp: LessonOperateService,
    private courseOp: CourseOperateService,
  ) {
    this.lessonOp.setCom(this);
    this.courseOp.setCom(this);
  }

  ngOnInit(): void {
    this.dowList = this.dic.getDowList();
    this.lessonStatusList = this.dic.getLessonStatusList();
    this.load();
  }

  change(){
    this.modal.create(
      StudentsEditStudentComponent,
      {size: 'sm'},
      {modalOptions:
          {
            nzTitle: '修改学生信息',
            nzComponentParams: {id: this.id},
            nzMaskClosable: false,
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
            nzComponentParams: {userId: this.id},
            nzMaskClosable: false,
          }
      }).subscribe(res => this.reload(res) );
  }

  deleteRecharge(rechargeId) {
    this.http.delete(`/recharges/${rechargeId}`)
      .subscribe(res => {
          this.msgSrv.success('保存成功');
          this.load();
        },
        error => {
          console.log('post请求失败', error);
        }
      );
  }

  createLesson() {
    this.modal.create(
      SharedEditLessonComponent,
      {size: 'sm'},
      {modalOptions:
          {
            nzTitle: `${this.student.name}-安排单节课程`,
            nzComponentParams: {userId: this.id},
            nzMaskClosable: false,
          }
      }).subscribe(res => this.reload(res) );
  }

  createCourse() {
    this.modal.create(
      SharedEditCourseComponent,
      {size: 'sm'},
      {modalOptions:
          {
            nzTitle: `${this.student.name}-安排固定课程`,
            nzComponentParams: {userId: this.id},
            nzMaskClosable: false,
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
