import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import {ReuseTabService} from "@delon/abc";
import {JsonData} from "@shared/shared.module";

@Component({
  selector: 'app-students-student',
  templateUrl: './student.component.html',
})
export class StudentsStudentComponent implements OnInit {
  
  id = this.route.snapshot.params.id;
  student: any;

  constructor(
    private route: ActivatedRoute,
    public msgSrv: NzMessageService,
    public http: _HttpClient,
    private reuseTabService: ReuseTabService
  ) { }

  ngOnInit(): void {
    this.http.get<JsonData>(`/students/${this.id}`)
      .subscribe(res =>
      {
        this.student = res.data;
        this.reuseTabService.title = this.student.name;
      });
  }
}
