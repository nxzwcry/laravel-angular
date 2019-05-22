import { Component, OnInit, ViewChild } from '@angular/core';
import {_HttpClient, ModalHelper, SettingsService} from '@delon/theme';
import {JsonData} from "@shared/shared.module";
import {DictionaryService} from "@shared/services/dictionary.service";
import {NzMessageService} from "ng-zorro-antd";
import {debounceTime} from "rxjs/operators";
import {FormControl} from "@angular/forms";
import {LessonOperateService} from "@shared/services/lesson-operate.service";
import {ACLService} from "@delon/acl";
import * as differenceInCalendarDays from "date-fns/difference_in_calendar_days";
import {copy} from "@delon/util";

@Component({
  selector: 'app-count-year',
  templateUrl: './year.component.html',
})
export class CountYearComponent implements OnInit {
  displayList: Array<any>;
  today = new Date();
  hidden = true;
  year: any;
  visible = false;
  type: string;
  index: number;
  loading = false;

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
    if (this.year)
    {
      this.loading = true;
      this.http.post<JsonData>('/count/getYearCount', {'year': this.year}).subscribe(
        (data) =>{
          this.hidden = false;
          this.displayList = data.data;
          this.loading = false;
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
    this.year = time.getFullYear();
    this.load();
  }

  close(): void {
    this.visible = false;
  }

}
