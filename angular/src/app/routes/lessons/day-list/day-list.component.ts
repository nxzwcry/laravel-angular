import { Component, OnInit, ViewChild } from '@angular/core';
import {_HttpClient, ModalHelper, SettingsService} from '@delon/theme';
import {JsonData} from "@shared/shared.module";
import {DictionaryService} from "@shared/services/dictionary.service";
import {NzMessageService} from "ng-zorro-antd";
import {FormControl} from "@angular/forms";
import {debounceTime} from "rxjs/operators";
import {LessonOperateService} from "@shared/services/lesson-operate.service";
import {ACLService} from "@delon/acl";

@Component({
  selector: 'app-lessons-day-list',
  templateUrl: './day-list.component.html',
})
export class LessonsDayListComponent implements OnInit {
  displayList: Array<any>;
  dowList: Array<any>;
  lessonStatusList: Array<any>;
  private wordFilter:FormControl = new FormControl();
  private wordFilter:FormControl = new FormControl();
  searchWord: string;
  userid: number;

  constructor(private http: _HttpClient,
              public msgSrv: NzMessageService,
              private modal: ModalHelper,
              private dic: DictionaryService,
              private op: LessonOperateService,
              private settingService: SettingsService,
              private acl: ACLService,
              ) {
    this.op.setCom(this);
  }

  ngOnInit() {
    this.userid = this.settingService.user.id;
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
    this.http.post<JsonData>('/lessons/time-list').subscribe(
      (data) =>{
        this.displayList = data.data;
      }
    );
  }

}
