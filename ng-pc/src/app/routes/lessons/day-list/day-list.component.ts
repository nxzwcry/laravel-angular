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
  styleUrls: ['./day-list.component.css']
})
export class LessonsDayListComponent implements OnInit {
  displayList: Array<any>;
  dowList: Array<any>;
  lessonStatusList: Array<any>;
  day:FormControl = new FormControl();
  hidden = true;
  stime: any;
  etime: any;
  userid: number;
  isVisible = false;
  loading = false;

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
  }

  load() {
    if (this.stime && this.etime)
    {
      this.loading = true;
      this.http.post<JsonData>('/lessons/time-list', {'stime': this.stime, 'etime': this.etime}).subscribe(
        (data) =>{
          if (data.data[0])
          {
            this.hidden = false;
            this.displayList = data.data;
          }
          else
          {
            this.hidden = true;
          }
          this.loading = false;
        }
      );
    }
  }

  change(time: Date) {
    // console.log(time);
    let temp = new Date(time.valueOf());
    temp.setHours(0, 0, 0);
    this.stime = temp.getTime()/1000;
    temp.setHours(23, 59, 59);
    this.etime = temp.getTime()/1000;
    this.load();
  }

  showModal(i): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

}
