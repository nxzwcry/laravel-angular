import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {ActivatedRoute} from "@angular/router";
import {ListService} from "../../../shared/list.service";

// Variable in assets/js/scripts.js file
declare var AdminLTE: any;

@Component({
  selector: 'app-admin-recharge-list',
  templateUrl: './admin-recharge-list.component.html',
  styleUrls: ['./admin-recharge-list.component.css']
})
export class AdminRechargeListComponent implements OnInit {

  dataSource: Observable<any>;
  private studentId: number;
  recharges: any;
  studentName: string;

  constructor(private routeInfo: ActivatedRoute, private http: HttpClient, public list: ListService) {  }

  ngOnInit() {
    // Actualiza la barra latera y el footer
    AdminLTE.init();

    this.studentId = this.routeInfo.snapshot.params["id"];
    this.http.get(`/api/students/${this.studentId}`).subscribe(
      (data) => {
        this.studentName = data.data.ename + data.data.name;
      }
    );

    this.dataSource = this.http.get(`/api/recharges/${this.studentId}`);
    this.dataSource.subscribe(
      (data) => this.recharges = data.data
    );
  }

}
