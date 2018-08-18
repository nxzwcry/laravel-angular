import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {ListService} from "../../../shared/list.service";
import {StatusService, Student} from "../../../shared/status.service";
declare var AdminLTE: any;

@Component({
  selector: 'app-admin-student-show',
  templateUrl: './admin-student-show.component.html',
  styleUrls: ['./admin-student-show.component.css']
})
export class AdminStudentShowComponent implements OnInit {

  dataSource: Observable<any>;
  private studentId: number;
  student: any;

  constructor(private routeInfo: ActivatedRoute, private http: HttpClient, public list: ListService, private status: StatusService) {  }

  ngOnInit() {
    // Actualiza la barra latera y el footer
    AdminLTE.init();

    this.studentId = this.routeInfo.snapshot.params["id"];

    this.dataSource = this.http.get(`/api/students/${this.studentId}`);
    this.dataSource.subscribe(
      (data) => {
        this.student = data.data;
        this.status.setStudent(new Student(this.student.id, this.student.ename, this.student.name, this.student.cteacher_user_id, this.student.agent_user_id));
      }
    );
  }

  }
