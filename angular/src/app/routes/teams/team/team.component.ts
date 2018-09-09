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

@Component({
  selector: 'app-teams-team',
  templateUrl: './team.component.html',
})
export class TeamsTeamComponent implements OnInit {
  id = this.route.snapshot.params.id;
  team: any;
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
    // this.modal.create(
    //   StudentsEditStudentComponent,
    //   {size: 'sm'},
    //   {modalOptions:
    //       {
    //         nzTitle: '修改学生信息',
    //         nzComponentParams: {id: this.id}
    //       }
    //   }).subscribe(res => this.reload(res) );
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
