import { Component, OnInit, ViewChild } from '@angular/core';
import {_HttpClient, ModalHelper, SettingsService} from '@delon/theme';
import {JsonData} from "@shared/shared.module";
import {DictionaryService} from "@shared/services/dictionary.service";
import {NzMessageService} from "ng-zorro-antd";
import {debounceTime} from "rxjs/operators";
import {FormControl} from "@angular/forms";
import {CourseOperateService} from "@shared/services/course-operate.service";

@Component({
  selector: 'app-lessons-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class LessonsCourseListComponent implements OnInit {
  displayList: Array<any>;
  dowList: Array<any>;
  lessonStatusList: Array<any>;
  wordFilter:FormControl = new FormControl();
  searchWord: string;
  loading = true;

  constructor(private http: _HttpClient,
              public msgSrv: NzMessageService,
              private modal: ModalHelper,
              private dic: DictionaryService,
              private op: CourseOperateService,
  ) {
    this.op.setCom(this);
  }

  ngOnInit() {
    this.dowList = this.dic.getDowList();
    this.lessonStatusList = this.dic.getLessonStatusList();
    this.wordFilter.valueChanges
      .pipe(debounceTime(500))
      .subscribe(
        value => this.searchWord = value
      );
    this.load();
  }

  load() {
    this.loading = true;
    this.http.get<JsonData>('/courses').subscribe(
      (data) =>{
        this.displayList = data.data;
        this.loading = false;
      }
    );
  }

}
