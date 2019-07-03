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
  selector: 'app-lessons-confirm',
  templateUrl: './confirm.component.html',
})
export class LessonsConfirmComponent implements OnInit {
  displayList: Array<any>;
  dowList: Array<any>;
  lessonStatusList: Array<any>;
  wordFilter:FormControl = new FormControl();
  searchWord: string;
  userid: number;
  loading = true;

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
    this.loading = true;
    this.http.get<JsonData>('/lessons/confirm').subscribe(
      (data) =>{
        if (this.acl.canAbility('lesson-delete'))
        {
          this.displayList = data.data;
        }
        else {
          // 如果不是管理员的话则只筛选该老师名下的学员
          /** filter data **/
          const filterFunc = item => (item.cteacher_id == this.userid);
          this.displayList = data.data.filter(item => filterFunc(item));
        }
        this.loading = false;
      }
    );
  }

}
