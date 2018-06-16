import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/auth.service";

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient, private auth:AuthService) { }

  ngOnInit() {
  }

  logout() {
    this.http.get('api/logout')
      .subscribe(
        val => {
          console.log('用户注销成功', val);
          this.auth.removeToken();
          this.router.navigate(['/adminlogin']);
        },
        error => {
          console.log('用户注销失败', error);
        }
      );
  }

}
