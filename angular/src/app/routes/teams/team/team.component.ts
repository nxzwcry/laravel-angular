import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import {_HttpClient, ModalHelper} from '@delon/theme';
import {ReuseTabService} from "@delon/abc";
import {JsonData} from "@shared/shared.module";
import {DictionaryService} from "@shared/services/dictionary.service";
import {TeamsAddStudentsComponent} from "../add-students/add-students";
import {LessonsEditLessonComponent} from "../../lessons/edit-lesson/edit-lesson.component";
import {LessonsEditCourseComponent} from "../../lessons/edit-course/edit-course.component";
import {TeamsEditTeamComponent} from "../edit-team/edit-team.component";
import {LessonOperateService} from "@shared/services/lesson-operate.service";
import {CourseOperateService} from "@shared/services/course-operate.service";

@Component({
  selector: 'app-teams-team',
  templateUrl: './team.component.html',
})
export class TeamsTeamComponent implements OnInit {
  id = this.route.snapshot.params.id;
  team: any;
  dowList: Array<any>;
  lessonStatusList: Array<any>;

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
      TeamsEditTeamComponent,
      {size: 'sm'},
      {modalOptions:
          {
            nzTitle: '修改班级信息',
            nzComponentParams: {teamId: this.id}
          }
      }).subscribe(res => this.reload(res) );
  }

  deleteStudent(student: number){
    this.http.put(`/teams/deletestudent/${this.id}`, {student: student})
      .subscribe(res => {
            this.msgSrv.success('保存成功');
            this.load();
          },
        error => {
          console.log('post请求失败', error);
        }
      );
  }

  addStudent(){
    this.modal.create(
      TeamsAddStudentsComponent,
      {size: 'sm'},
      {modalOptions:
          {
            nzTitle: `${this.team.name}-添加学生`,
            nzComponentParams: {id: this.id}
          }
      }).subscribe(res => this.reload(res) );
  }

  createLesson() {
    this.modal.create(
      LessonsEditLessonComponent,
      {size: 'sm'},
      {modalOptions:
          {
            nzTitle: `${this.team.name}-安排单节课程`,
            nzComponentParams: {teamId: this.id}
          }
      }).subscribe(res => this.reload(res) );
  }

  createCourse() {
    this.modal.create(
      LessonsEditCourseComponent,
      {size: 'sm'},
      {modalOptions:
          {
            nzTitle: `${this.team.name}-安排固定课程`,
            nzComponentParams: {teamId: this.id}
          }
      }).subscribe(res => this.reload(res) );
  }

  reload(b: Boolean) {
    if(b) this.load();
  }

  load() {
    this.http.get<JsonData>(`/teams/${this.id}`)
      .subscribe(res =>
      {
        this.team = res.data;
        this.reuseTabService.title = this.team.name;
      });
  }
}
