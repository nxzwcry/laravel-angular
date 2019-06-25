import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {NzModalRef, NzMessageService, NzModalService} from 'ng-zorro-antd';
import {_HttpClient, ModalHelper, SettingsService} from '@delon/theme';
import {ReuseTabService} from "@delon/abc";
import {JsonData} from "@shared/shared.module";
import {Student} from "@shared/modules/student";
import {DictionaryService} from "@shared/services/dictionary.service";
import {SharedEditStudentComponent} from "@shared/components/edit-student/edit-student.component";
import {StudentsEditRechargeComponent} from "../edit-recharge/edit-recharge.component";
import {LessonOperateService} from "@shared/services/lesson-operate.service";
import {CourseOperateService} from "@shared/services/course-operate.service";
import {SharedEditLessonComponent} from "@shared/components/edit-lesson/edit-lesson.component";
import {SharedEditCourseComponent} from "@shared/components/edit-course/edit-course.component";
import {UserDataService} from "@shared/services/user-data.service";

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
  confirmModal: NzModalRef;
  userid: number;

  constructor(
    private route: ActivatedRoute,
    public msgSrv: NzMessageService,
    public http: _HttpClient,
    private reuseTabService: ReuseTabService,
    private dic: DictionaryService,
    private modal: ModalHelper,
    private nzmodal: NzModalService,
    private lessonOp: LessonOperateService,
    private courseOp: CourseOperateService,
    private userData: UserDataService,
    private settings: SettingsService,
  ) {
    this.lessonOp.setCom(this);
    this.courseOp.setCom(this);
    this.userid = this.settings.user.id;
  }

  ngOnInit(): void {
    this.dowList = this.dic.getDowList();
    this.lessonStatusList = this.dic.getLessonStatusList();
    this.load();
  }

  change(){
    this.modal.create(
      SharedEditStudentComponent,
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

  stopModal(){
    this.confirmModal = this.nzmodal.confirm({
      nzTitle: '不续费',
      nzContent: `确定要将${this.student.name}的未上课程全部移除，并将其加入不续费学生名单吗？`,
      nzOnOk: () => this.stop()
    });

  }

  stopLessonsModal(){
    this.confirmModal = this.nzmodal.confirm({
      nzTitle: '暂时停课',
      nzContent: `确定要将${this.student.name}的未上课程全部移除，并将其加入停课学生名单吗？`,
      nzOnOk: () => this.stopLessons()
    });
  }

  stop(){
    this.http.put(`/students/stop/${this.student.id}`)
      .subscribe(res => {
          this.msgSrv.success('保存成功');
          this.load();
          this.userData.reloadUserData();
        },
        error => {
          console.log('post请求失败', error);
        }
      );
  }

  stopLessons(){
    this.http.put(`/students/stopLessons/${this.student.id}`)
      .subscribe(res => {
          this.msgSrv.success('保存成功');
          this.load();
          this.userData.reloadUserData();
          // console.log(this.settings.user.no_lessons);
        },
        error => {
          console.log('post请求失败', error);
        }
      );
  }
}
