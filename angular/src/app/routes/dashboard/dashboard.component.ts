import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {ReuseTabService} from "@delon/abc";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  constructor(
    private http: _HttpClient,
    private reuseTabService: ReuseTabService
  ) {
    reuseTabService.title = "首页";
  }

  ngOnInit() {
  }

}
