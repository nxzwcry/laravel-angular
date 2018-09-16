import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {_HttpClient, ModalHelper, SettingsService} from '@delon/theme';
import {JsonData} from "@shared/shared.module";
import {DictionaryService} from "@shared/services/dictionary.service";
import {NzMessageService} from "ng-zorro-antd";
import {ActivatedRoute} from "@angular/router";
import {ReuseTabService} from "@delon/abc";
import {CourseOperateService} from "@shared/services/course-operate.service";
import {SharedEditCourseComponent} from "@shared/components/edit-course/edit-course.component";

@Component({
  selector: 'app-lessons-course',
  templateUrl: './course.component.html',
})
export class LessonsCourseComponent implements OnInit {
  lesson: any;
  id = this.route.snapshot.params.id;

  constructor(
    private route: ActivatedRoute,
    private http: _HttpClient,
    public msgSrv: NzMessageService,
    private modal: ModalHelper,
    private dic: DictionaryService,
    private op: CourseOperateService,
    private reuseTabService: ReuseTabService,
  ) {
    this.op.setCom(this);
  }

  change() {
    this.modal.create(
      SharedEditCourseComponent,
      {size: 'sm'},
      {modalOptions:
          {
            nzTitle: `修改固定课程信息`,
            nzComponentParams: {courseId: this.id}
          }
      }).subscribe(res => this.op.reload(res) );
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.http.get<JsonData>(`/courses/${this.id}`).subscribe(
      (data) =>{
        this.lesson = data.data;
        this.reuseTabService.title = this.lesson.name;
      }
    );
  }

}
