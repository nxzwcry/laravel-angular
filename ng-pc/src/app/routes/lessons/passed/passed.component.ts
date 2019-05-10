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
  selector: 'app-lessons-passed',
  templateUrl: './passed.component.html',
  styleUrls: ['./passed.component.css']
})
export class LessonsPassedComponent implements OnInit {
  displayList: Array<any>;
  lessonStatusList: Array<any>;
  wordFilter:FormControl = new FormControl();
  searchWord: string;
  userid: number;
  isVisible = false;
  index: number;
  loading = true;

  constructor(private http: _HttpClient,
              public msgSrv: NzMessageService,
              private modal: ModalHelper,
              private dic: DictionaryService,
              private op: LessonOperateService,
              private acl: ACLService,
              private settingService: SettingsService,
              ) {
    this.op.setCom(this);
  }

  ngOnInit() {
    this.userid = this.settingService.user.id;
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
    this.http.get<JsonData>('/lessons/index/-7').subscribe(
      (data) =>{
        this.displayList = data.data;
        this.loading = false;
      }
    );
  }

  showModal(i): void {
    this.index = i;
    this.isVisible = true;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

}
