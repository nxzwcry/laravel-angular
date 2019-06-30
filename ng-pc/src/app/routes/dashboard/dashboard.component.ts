import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {ACLService} from "@delon/acl";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
})
export class DashboardComponent implements OnInit {

  constructor(
    private http: _HttpClient,
    private acl: ACLService,
    private router: Router,
  ) {
    // console.log('test');
      if ( acl.canAbility('show-agent-home') )
      {
        router.navigateByUrl("/dashboard-agent");
      }
      else if ( acl.canAbility('show-teacher-home') )
      {
        router.navigateByUrl("/dashboard-teacher");
      }
  }

  ngOnInit() {
  }

}
