import { Component, OnInit, ViewChild } from '@angular/core';
import {_HttpClient, ModalHelper, SettingsService} from '@delon/theme';
import {JsonData} from "@shared/shared.module";
import {DictionaryService} from "@shared/services/dictionary.service";
import {NzMessageService} from "ng-zorro-antd";
import {debounceTime} from "rxjs/operators";
import {FormControl} from "@angular/forms";
import {LessonOperateService} from "@shared/services/lesson-operate.service";
import {ACLService} from "@delon/acl";
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import {copy} from "@delon/util";

@Component({
  selector: 'app-count-month',
  templateUrl: './month.component.html',
})
export class CountMonthComponent implements OnInit {
  displayList: Array<any>;
  private month:FormControl = new FormControl();
  today = new Date();
  hidden = true;
  stime: any;
  etime: any;

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
  }

  load() {
    if (this.stime && this.etime)
    {
      this.http.post<JsonData>('/count/getCount', {'stime': this.stime, 'etime': this.etime}).subscribe(
        (data) =>{
          this.hidden = false;
          this.displayList = data.data;
        }
      );
    }
  }

  disabledDate = (current: Date): boolean => {
    // Can not select days before today and today
    return differenceInCalendarDays(current, this.today) > 0;
  };

  change(time: Date) {
    // console.log(time);
    let temp = new Date(time.valueOf());
    temp.setDate(1);
    temp.setHours(0, 0, 0);
    this.stime = temp.getTime()/1000;
    temp.setMonth(temp.getMonth()+1);
    this.etime = temp.getTime()/1000;
    this.load();
  }

}
