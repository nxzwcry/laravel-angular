import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import {DictionaryService} from "@shared/services/dictionary.service";
import { Observable, of } from 'rxjs';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-students-edit-recharge',
  templateUrl: './edit-recharge.component.html',
})
export class StudentsEditRechargeComponent implements OnInit {
  loading: Boolean = false;
  record: any = {};
  @Input() userId: string;
  @Input() rechargeId: string;
  formModel: FormGroup;
  req: any = {};
  agentList: Array<any> = [];

  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient,
    private dic: DictionaryService,
    private fb: FormBuilder,
  ) {
    this.formModel = fb.group({
        waijiao: ['0'],
        zhongjiao: ['0'],
        jingpin: ['0'],
        money: ['0'],
        user_id: ['', Validators.required],
        note: ['']
      }
    );
  }

  ngOnInit(): void {
    this.dic.getAgentList().subscribe(res => this.agentList = res.data);
  }

  save() {
    if(this.formModel.valid) {
      this.req = this.formModel.value;
      if (this.userId)
      {
        this.req = this.formModel.value;
        this.req.student_id = this.userId;
        this.http.post(`/recharges`, this.req)
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
