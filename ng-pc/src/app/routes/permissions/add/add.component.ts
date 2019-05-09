import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-permissions-add',
  templateUrl: './add.component.html',
})
export class PermissionsAddComponent implements OnInit {
  loading: Boolean = false;
  record: any = {};
  i: any = {};
  formModel: FormGroup;
  req: any = {};
  @Input() url: string;

  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient,
    private fb: FormBuilder,
  ) {
    this.formModel = fb.group({
        name: ['', [Validators.required]],
        cn_name: ['', [Validators.required]],
      }
    );
  }

  ngOnInit(): void { }

  save() {
    if(this.formModel.valid) {
      this.req = this.formModel.value;
      if(this.req.birthday){
        this.req.birthday = this.req.birthday.valueOf()/1000;
      }
      this.http.post(this.url, this.formModel.value)
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
      this.loading = true;
    }
  }

  close() {
    this.modal.destroy(false);
  }
}
