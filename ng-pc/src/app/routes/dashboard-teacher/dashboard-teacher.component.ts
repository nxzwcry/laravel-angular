import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-dashboard-teacher',
  templateUrl: './dashboard-teacher.component.html',
})
export class DashboardTeacherComponent implements OnInit {

  constructor(
    private http: _HttpClient
  ) { }

  ngOnInit() {
  }

}
