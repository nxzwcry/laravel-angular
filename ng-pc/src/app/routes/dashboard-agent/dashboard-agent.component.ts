import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-dashboard-agent',
  templateUrl: './dashboard-agent.component.html',
})
export class DashboardAgentComponent implements OnInit {

  constructor(
    private http: _HttpClient
  ) { }

  ngOnInit() {
  }

}
