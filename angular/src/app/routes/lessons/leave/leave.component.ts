import { Component, OnInit, ViewChild } from '@angular/core';
import {_HttpClient, ModalHelper, SettingsService} from '@delon/theme';
import {JsonData} from "@shared/shared.module";
import {DictionaryService} from "@shared/services/dictionary.service";
import {NzMessageService} from "ng-zorro-antd";
import {FormControl} from "@angular/forms";
import {debounceTime} from "rxjs/operators";
import {LessonsEditLessonNameComponent} from "../edit-lesson-name/edit-lesson-name.component";
import {LessonsEditLessonScoreComponent} from "../edit-lesson-score/edit-lesson-score.component";
import {LessonOperateService} from "@shared/services/lesson-operate.service";

@Component({
  selector: 'app-lessons-leave',
  templateUrl: './leave.component.html',
})
export class LessonsLeaveComponent implements OnInit {
  displayList: Array<any>;
  dowList: Array<any>;
  lessonStatusList: Array<any>;
  private wordFilter:FormControl = new FormControl();
  searchWord: string;

  constructor(private http: _HttpClient,
              public msgSrv: NzMessageService,
              private modal: ModalHelper,
              private dic: DictionaryService,
              private op: LessonOperateService,
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
    this.http.get<JsonData>('/lessons/leave').subscribe(
      (data) =>{
        this.displayList = data.data;
      }
    );
  }

}
