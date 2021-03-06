import { Injectable } from '@angular/core';
import {_HttpClient, ModalHelper} from "@delon/theme";
import {NzMessageService} from "ng-zorro-antd";
import {SharedEditLessonNameComponent} from "@shared/components/edit-lesson-name/edit-lesson-name.component";
import {SharedEditLessonScoreComponent} from "@shared/components/edit-lesson-score/edit-lesson-score.component";
import {SharedAddLessonBukeComponent} from "@shared/components/add-lesson-buke/add-lesson-buke.component";
import {SharedCopyLessonComponent} from "@shared/components/copy-lesson/copy-lesson.component";
import {JsonData} from "@shared/shared.module";
import {SharedEditVideoComponent} from "@shared/components/edit-video/edit-video.component";

@Injectable()
export class LessonOperateService {

  com: any;
  constructor(
    private http: _HttpClient,
    public msgSrv: NzMessageService,
    private modal: ModalHelper,
              ) {
  }

  public setCom(com: any)
  {
    this.com = com;
  }

  leave(lesson){
    this.http.put(`/lessons/status/${lesson.id}`, {status: 3})
      .subscribe((res:JsonData) => {
          this.msgSrv.success('保存成功');
          lesson.status = res.data.status;
          lesson.waijiao_cost = res.data.waijiao_cost;
          lesson.zhongjiao_cost = res.data.zhongjiao_cost;
          lesson.jingpin_cost = res.data.jingpin_cost;
        },
        error => {
          console.log('post请求失败', error);
        }
      );
  }

  deleteLesson(lessonId){
    this.http.delete(`/lessons/${lessonId}`)
      .subscribe(res => {
          this.msgSrv.success('保存成功');
          this.com.load();
        },
        error => {
          console.log('post请求失败', error);
        }
      );
  }

  createVideo(lesson){
    this.modal.create(
      SharedEditVideoComponent,
      {size: 'sm'},
      {modalOptions:
          {
            nzTitle: '上传视频',
            nzComponentParams: {lessonId: lesson.id},
            nzMaskClosable: false,
          }
      }).subscribe(res => {
        if (res) {lesson.video = res;}
      } );
  }

  changeVideo(lesson){
    this.modal.create(
      SharedEditVideoComponent,
      {size: 'sm'},
      {modalOptions:
          {
            nzTitle: '修改视频',
            nzComponentParams: {videoId: lesson.video.id},
            nzMaskClosable: false,
          }
      }).subscribe(res => {
        if (res) {lesson.video = res;}
      } );
  }

  changeName(lesson){
    this.modal.create(
      SharedEditLessonNameComponent,
      {size: 'sm'},
      {modalOptions:
          {
            nzTitle: '修改课程名称',
            nzComponentParams: {lessonId: lesson.id},
            nzMaskClosable: false,
          }
      }).subscribe(res => lesson.name = res );
  }

  changeScore(lesson){
    this.modal.create(
      SharedEditLessonScoreComponent,
      {size: 'sm'},
      {modalOptions:
          {
            nzTitle: '修改课程得分',
            nzComponentParams: {lessonId: lesson.id},
            nzMaskClosable: false,
          }
      }).subscribe(res => lesson.score = res );
  }

  addBuke(lessonId){
    this.modal.create(
      SharedAddLessonBukeComponent,
      {size: 'sm'},
      {modalOptions:
          {
            nzTitle: '添加补课',
            nzComponentParams: {lessonId: lessonId},
            nzMaskClosable: false,
          }
      }).subscribe(res => this.reload(res) );
  }

  copy(lessonId){
    this.modal.create(
      SharedCopyLessonComponent,
      {size: 'sm'},
      {modalOptions:
          {
            nzTitle: '复制课程给学生',
            nzComponentParams: {lessonId: lessonId},
            nzMaskClosable: false,
          }
      }).subscribe(res => this.reload(res));
  }

  copyToAll(lessonId){
    this.modal.create(
      SharedCopyLessonComponent,
      {size: 'sm'},
      {modalOptions:
          {
            nzTitle: '复制课程给学生',
            nzComponentParams: {lessonId: lessonId, checked: true},
            nzMaskClosable: false,
          }
      }).subscribe(res => this.reload(res));
  }

  noBuke(lessonId){
    if (lessonId)
    {
      this.http.put(`/lessons/buke/${lessonId}`)
        .subscribe(
          (val) => {
            this.msgSrv.success('保存成功');
            this.com.load();
          },
          error => {
            console.log('post请求失败', error);
          }
        );
    }
    else{
      console.log('未传入课程ID');
    }
  }

  confirm(lesson){
    this.http.put(`/lessons/status/${lesson.id}`, {status: 2})
      .subscribe((res:JsonData) => {
          this.msgSrv.success('保存成功');
          lesson.status = res.data.status;
        },
        error => {
          console.log('post请求失败', error);
        }
      );
  }

  reload(b: Boolean)
  {
    if(b) this.com.load();
  }

}
