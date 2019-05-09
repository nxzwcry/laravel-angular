import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import {DictionaryService} from "@shared/services/dictionary.service";
import { Observable, of } from 'rxjs';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Student} from "@shared/modules/student";
import {JsonData} from "@shared/shared.module";

@Component({
  selector: 'app-users-edit-user',
  templateUrl: './edit-user.component.html',
})
export class UsersEditUserComponent implements OnInit {
  loading: Boolean = false;
  record: any = {};
  @Input() id: string;
  roleList: Array<any> = [];
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
        name: [null, [Validators.required]],
        ename: [null],
        mid: [null],
        email: [null, [Validators.required, Validators.email]],
        role: [null],
      }
    );
  }

  ngOnInit(): void {
     this.dic.getRoleList().subscribe(data => this.roleList = data.data);
     if (this.id){
       this.http.get<JsonData>(`/users/${this.id}`).subscribe(
         (data) => {
           let user = data.data;
           this.formModel.setValue({
             name: user.name,
             ename: user.ename,
             mid: user.mid,
             email: user.email,
             role: user.role_id,
           });
         }
       );
     }
  }

  save() {
    // console.log('value', this.formModel.value);
    if(this.formModel.valid) {
      this.req = this.formModel.value;
      if (this.id)
      {
        this.http.put(`/users/${this.id}`, this.formModel.value)
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
        this.http.post('/users', this.formModel.value)
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
      this.loading = true;
    }
  }

  close() {
    this.modal.destroy(false);
  }
}
