import { Injectable } from '@angular/core';
import {_HttpClient, ModalHelper} from "@delon/theme";
import {NzMessageService} from "ng-zorro-antd";
import {SharedEditLessonNameComponent} from "@shared/components/edit-lesson-name/edit-lesson-name.component";

@Injectable()
export class CourseOperateService {

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

  deleteCourse(courseId){
    this.http.delete(`/courses/${courseId}`)
      .subscribe(res => {
          this.msgSrv.success('保存成功');
          this.com.load();
        },
        error => {
          console.log('post请求失败', error);
        }
      );
  }

  // changeName(course){
  //   this.modal.create(
  //     SharedEditLessonNameComponent,
  //     {size: 'sm'},
  //     {modalOptions:
  //         {
  //           nzTitle: '修改固定课程名称',
  //           nzComponentParams: {lessonId: course.id}
  //         }
  //     }).subscribe(res => course.name = res );
  // }

  reload(b: Boolean)
  {
    if(b) this.com.load();
  }

}
