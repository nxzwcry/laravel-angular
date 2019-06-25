import { Component, OnInit } from '@angular/core';
import {_HttpClient, ModalHelper, SettingsService} from '@delon/theme';
import {JsonData} from "@shared/shared.module";
import {UserDataService} from "@shared/services/user-data.service";
import {ACLService} from "@delon/acl";

@Component({
  selector: 'app-dashboard-teacher',
  templateUrl: './dashboard-teacher.component.html',
  styleUrls: ['./dashboard-teacher.component.css']
})
export class DashboardTeacherComponent implements OnInit {
  newList: Array<any>;
  xufeiList:  Array<any>;
  newLoading = true;
  xufeiLoading = true;
  today: Array<any>;
  todayLoading = true;

  constructor(
    private http: _HttpClient,
    private acl: ACLService,
    public settings: SettingsService,
    private userData: UserDataService,
  ) { }

  ngOnInit() {
    this.load();
  }

  load() {
    // 今日课程
    this.todayLoading = true;
    this.http.get<JsonData>('/users/today').subscribe(
      (data) =>{
        // this.today = data.data;
        if (data.data.length){
          this.today = data.data[0]['lessons'];
        }
        else
        {
          this.today = [];
        }
        // 按报名时间，由近到远
        this.todayLoading = false;
      }
    );

    // 新报名学员
    this.newLoading = true;
    this.http.get<JsonData>('/users/newStudentsT').subscribe(
      (data) =>{
        this.newList = data.data;
        // 按报名时间，由近到远
        this.newLoading = false;
      }
    );

    // 续费周期学员
    this.xufeiLoading = true;
    this.http.get<JsonData>('/users/xufeiStudentsT').subscribe(
      (data1) =>{
        this.xufeiList = data1.data;
        // 按剩余课次由少到多
        this.xufeiLoading = false;
      }
    );

    this.userData.reloadUserData();
  }

  newSort(sort: { key: string, value: string }): void {
    let data = JSON.parse(JSON.stringify(this.newList));;
    let sortName = sort.key;
    let sortValue = sort.value;
    if (sortName && sortValue) {
      this.newList = data.sort((a, b) => (sortValue === 'ascend') ? (a[ sortName ] > b[ sortName ] ? 1 : -1) : (b[ sortName ] > a[ sortName ] ? 1 : -1));
    }
  }

  xufeiSort(sort: { key: string, value: string }): void {
    let data = JSON.parse(JSON.stringify(this.xufeiList));
    let sortName = sort.key;
    let sortValue = sort.value;
    if (sortName && sortValue) {
      this.xufeiList = data.sort((a, b) => (sortValue === 'ascend') ? (a[ sortName ] > b[ sortName ] ? 1 : -1) : (b[ sortName ] > a[ sortName ] ? 1 : -1));
    }
  }

}
