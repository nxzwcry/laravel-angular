import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {JsonData} from "@shared/shared.module";
import {debounceTime} from "rxjs/operators";
import {ACLService} from "@delon/acl";

@Component({
  selector: 'app-dashboard-agent',
  templateUrl: './dashboard-agent.component.html',
})
export class DashboardAgentComponent implements OnInit {
  newList: Array<any>;
  stopList:  Array<any>;
  newStopList:  Array<any>;
  xufeiList:  Array<any>;
  newLoading = true;
  stopLoading = true;
  newStopLoading = true;
  xufeiLoading = true;

  constructor(
    private http: _HttpClient,
    private acl: ACLService,
  ) { }

  ngOnInit() {
    this.load();
  }

  load() {
    // 新报名学员
    this.newLoading = true;
    this.http.get<JsonData>('/users/newStudentsA').subscribe(
      (data) =>{
        this.newList = data.data;
        // 按报名时间，由近到远
        this.newLoading = false;
      }
    );

    // 续费周期学员
    this.xufeiLoading = true;
    this.http.get<JsonData>('/users/xufeiStudentsA').subscribe(
      (data1) =>{
        this.xufeiList = data1.data;
        // 按剩余课次由少到多
        this.xufeiLoading = false;
      }
    );

    // 停课学员（顾问可见）
    if ( this.acl.can("agent") )
    {
      this.stopLoading = true;
      this.http.get<JsonData>('/users/noLessons').subscribe(
        (data2) =>{
          this.stopList = data2.data;
          // 按停课时间，由近到远
          this.stopLoading = false;
        }
      );
    }
    else
    {
      this.stopLoading = false;
    }

    // 最近不续费学员（管理员可见）
    if ( this.acl.can("admin") ) {
      this.newStopLoading = true;
      this.http.get<JsonData>('/students/type/new-stoped').subscribe(
        (data3) => {
          this.newStopList = data3.data;
          // 按不续课时间，由近到远
          this.newStopLoading = false;
        }
      );
    }
    else {
      this.newStopLoading = false;
    }
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

  stopSort(sort: { key: string, value: string }): void {
    let data = JSON.parse(JSON.stringify(this.stopList));
    let sortName = sort.key;
    let sortValue = sort.value;
    if (sortName && sortValue) {
      this.stopList = data.sort((a, b) => (sortValue === 'ascend') ? (a[ sortName ] > b[ sortName ] ? 1 : -1) : (b[ sortName ] > a[ sortName ] ? 1 : -1));
    }
  }

  newStopSort(sort: { key: string, value: string }): void {
    let data = JSON.parse(JSON.stringify(this.newStopList));
    let sortName = sort.key;
    let sortValue = sort.value;
    if (sortName && sortValue) {
      this.newStopList = data.sort((a, b) => (sortValue === 'ascend') ? (a[ sortName ] > b[ sortName ] ? 1 : -1) : (b[ sortName ] > a[ sortName ] ? 1 : -1));
    }
  }
}
