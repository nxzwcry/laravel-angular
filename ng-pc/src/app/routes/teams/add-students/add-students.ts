import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import {DictionaryService} from "@shared/services/dictionary.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {JsonData} from "@shared/shared.module";

@Component({
  selector: 'app-teams-add-students',
  templateUrl: './add-students.component.html',
})
export class TeamsAddStudentsComponent implements OnInit {
  loading: Boolean = false;
  record: any = {};
  @Input() id: string;
  studentList: Array<any> = [];
  formModel: FormGroup;
  req: any = {};

  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient,
    private dic: DictionaryService,
    private fb: FormBuilder,
  ) {
    this.formModel = fb.group({
        students: [null],
      }
    );
  }

  ngOnInit(): void {
    this.http.get<JsonData>('/students').subscribe(
      (data) =>{
        this.studentList = data.data;
      }
    );
  }

  save() {
    if(this.formModel.valid) {
      this.req = this.formModel.value;
      if (this.id)
      {
        this.http.put(`/teams/addstudents/${this.id}`, this.formModel.value)
          .subscribe(
            (val) => {
              this.msgSrv.success('保存成功');
              this.modal.close(true);
            },
            error => {
              console.log('post请求失败', error);
              this.loading = false;
            }
          );
      }
      else{
      }
      this.loading = true;
    }
  }

  close() {
    this.modal.destroy(false);
  }
}
