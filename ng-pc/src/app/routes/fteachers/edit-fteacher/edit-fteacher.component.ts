import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import {DictionaryService} from "@shared/services/dictionary.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {JsonData} from "@shared/shared.module";

@Component({
  selector: 'app-fteachers-edit-fteacher',
  templateUrl: './edit-fteacher.component.html',
})
export class FteachersEditFteacherComponent implements OnInit {
  loading: Boolean = false;
  record: any = {};
  @Input() id: string;
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
        mid: [null, [Validators.required]],
      }
    );
  }

  ngOnInit(): void {
     if (this.id){
       this.http.get<JsonData>(`/fteachers/${this.id}`).subscribe(
         (data) => {
           let fteacher = data.data;
           this.formModel.setValue({
             name: fteacher.name,
             mid: fteacher.mid,
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
        this.http.put(`/fteachers/${this.id}`, this.formModel.value)
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
        this.http.post('/fteachers', this.formModel.value)
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
