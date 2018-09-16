import { Component, OnInit, ViewChild } from '@angular/core';
import {_HttpClient, ModalHelper, SettingsService} from '@delon/theme';
import {JsonData} from "@shared/shared.module";
import {DictionaryService} from "@shared/services/dictionary.service";
import {NzMessageService} from "ng-zorro-antd";
import {FormControl} from "@angular/forms";
import {debounceTime} from "rxjs/operators";
import {LessonOperateService} from "@shared/services/lesson-operate.service";

@Component({
  selector: 'app-lessons-passed',
  templateUrl: './passed.component.html',
})
export class LessonsPassedComponent implements OnInit {
  displayList: Array<any>;
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
    this.lessonStatusList = this.dic.getLessonStatusList();
    this.wordFilter.valueChanges
      .pipe(debounceTime(500))
      .subscribe(
        value => this.searchWord = value
      );
    this.load();
  }

  load() {
    this.http.get<JsonData>('/lessons/index/-7').subscribe(
      (data) =>{
        this.displayList = data.data;
      }
    );
  }

}
