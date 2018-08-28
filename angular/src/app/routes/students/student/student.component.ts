import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import {_HttpClient, ModalHelper} from '@delon/theme';
import {ReuseTabService} from "@delon/abc";
import {JsonData} from "@shared/shared.module";
import {Student} from "@shared/modules/student";
import {DictionaryService} from "@shared/services/dictionary.service";
import {UsersEditUserComponent} from "../../users/edit-user/edit-user.component";
import {StudentsEditStudentComponent} from "../edit-student/edit-student.component";

@Component({
  selector: 'app-students-student',
  templateUrl: './student.component.html',
})
export class StudentsStudentComponent implements OnInit {
  id = this.route.snapshot.params.id;
  student: Student;

  constructor(
    private route: ActivatedRoute,
    public msgSrv: NzMessageService,
    public http: _HttpClient,
    private reuseTabService: ReuseTabService,
    private dic: DictionaryService,
    private modal: ModalHelper,
  ) { }

  ngOnInit(): void {
    this.load();
  }

  change(){
    this.modal.create(StudentsEditStudentComponent, {size: 'sm'}, {modalOptions: {nzTitle: '修改学生信息',  nzComponentParams: {id: this.id}}}).subscribe(res => this.reload(res) );
  }

  reload(b: Boolean) {
    if(b) this.load();
  }

  load() {
    this.http.get<JsonData>(`/students/${this.id}`)
      .subscribe(res =>
      {
        this.student = res.data;
        this.reuseTabService.title = this.student.name;
      });
  }
}
