import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {_HttpClient, ModalHelper, SettingsService} from '@delon/theme';
import {JsonData} from "@shared/shared.module";
import {DictionaryService} from "@shared/services/dictionary.service";
import {NzMessageService} from "ng-zorro-antd";
import {FormControl} from "@angular/forms";
import {debounceTime} from "rxjs/operators";
import {LessonOperateService} from "@shared/services/lesson-operate.service";
import {ActivatedRoute} from "@angular/router";
import {ReuseTabService} from "@delon/abc";

@Component({
  selector: 'app-lessons-lesson',
  templateUrl: './lesson.component.html',
})
export class LessonsLessonComponent implements OnInit {
  lesson: any;
  lessonStatusList: Array<any>;
  id = this.route.snapshot.params.id;
  today: any;

  constructor(
    private route: ActivatedRoute,
    private http: _HttpClient,
    public msgSrv: NzMessageService,
    private modal: ModalHelper,
    private dic: DictionaryService,
    private op: LessonOperateService,
    private reuseTabService: ReuseTabService,
  ) {
    this.op.setCom(this);
  }

  ngOnInit() {
    this.lessonStatusList = this.dic.getLessonStatusList();
    this.today = new Date();
    this.today.setHours(23,59,59);
    this.load();
  }

  load() {
    this.http.get<JsonData>(`/lessons/${this.id}`).subscribe(
      (data) =>{
        this.lesson = data.data;
        this.reuseTabService.title = this.lesson.name;
      }
    );
  }

}
