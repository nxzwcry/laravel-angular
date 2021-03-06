import { Component, OnInit, ViewChild } from '@angular/core';
import {_HttpClient, ModalHelper} from '@delon/theme';
import {JsonData} from "@shared/shared.module";
import {DictionaryService} from "@shared/services/dictionary.service";
import {NzMessageService} from "ng-zorro-antd";
import {FormControl} from "@angular/forms";
import {LessonOperateService} from "@shared/services/lesson-operate.service";
import * as differenceInCalendarDays from "date-fns/difference_in_calendar_days";

@Component({
  selector: 'app-count-place',
  templateUrl: './place.component.html',
})
export class CountPlaceComponent implements OnInit {
  displayList: Array<any>;
  month:FormControl = new FormControl();
  today = new Date();
  hidden = true;
  stime: any;
  etime: any;
  visible = false;
  type: string;
  index: number;
  count: any;
  loading = false;

  constructor(private http: _HttpClient,
              public msgSrv: NzMessageService,
              private modal: ModalHelper,
              private dic: DictionaryService,
              private op: LessonOperateService,
  ) {
    this.op.setCom(this);
  }

  ngOnInit() {
  }

  load() {
    if (this.stime && this.etime)
    {
      this.loading = true;
      this.http.post<JsonData>('/count/getPlaceCount', {'stime': this.stime, 'etime': this.etime}).subscribe(
        (data) =>{
          this.hidden = false;
          this.displayList = data.data;
          this.count = data.count;
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
    let temp = new Date(time.valueOf());
    temp.setDate(1);
    temp.setHours(0, 0, 0);
    this.stime = temp.getTime()/1000;
    temp.setMonth(temp.getMonth()+1);
    this.etime = temp.getTime()/1000;
    this.load();
  }

  openRenshu(i): void {
    this.index = i;
    this.type = 'renshu';
    this.visible = true;
  }

  openLiuru(i): void {
    this.index = i;
    this.type = 'liuru';
    this.visible = true;
  }

  openLiushi(i): void {
    this.index = i;
    this.type = 'liushi';
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

}
