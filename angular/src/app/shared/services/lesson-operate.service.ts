import { Injectable } from '@angular/core';
import {_HttpClient, ModalHelper} from "@delon/theme";
import {NzMessageService} from "ng-zorro-antd";
import {SharedEditLessonNameComponent} from "@shared/components/edit-lesson-name/edit-lesson-name.component";
import {SharedEditLessonScoreComponent} from "@shared/components/edit-lesson-score/edit-lesson-score.component";

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

  leave(lessonId){
    this.http.put(`/lessons/leave/${lessonId}`)
      .subscribe(res => {
          this.msgSrv.success('保存成功');
          this.com.load();
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

  changeName(lessonId){
    this.modal.create(
      SharedEditLessonNameComponent,
      {size: 'sm'},
      {modalOptions:
          {
            nzTitle: '修改课程名称',
            nzComponentParams: {lessonId: lessonId}
          }
      }).subscribe(res => this.reload(res) );
  }

  changeScore(lessonId){
    this.modal.create(
      SharedEditLessonScoreComponent,
      {size: 'sm'},
      {modalOptions:
          {
            nzTitle: '修改课程得分',
            nzComponentParams: {lessonId: lessonId}
          }
      }).subscribe(res => this.reload(res) );
  }

  reload(b: Boolean)
  {
    if(b) this.com.load();
  }

}
