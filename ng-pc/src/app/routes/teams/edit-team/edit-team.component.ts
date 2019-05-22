import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import {DictionaryService} from "@shared/services/dictionary.service";
import { Observable, of } from 'rxjs';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {JsonData} from "@shared/shared.module";

@Component({
  selector: 'app-teams-edit-team',
  templateUrl: './edit-team.component.html',
})
export class TeamsEditTeamComponent implements OnInit {
  loading: Boolean = false;
  record: any = {};
  @Input() teamId: string;
  formModel: FormGroup;
  req: any = {};
  placeList: Array<any>;
  cteacherList: Array<any>;

  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient,
    private dic: DictionaryService,
    private fb: FormBuilder,
  ) {
    this.formModel = fb.group({
        name: [null, Validators.required],
        cteacher_user_id: [],
        place_id: [],
        num: [],
      }
    );
  }

  ngOnInit(): void {
    this.dic.getPlaceList().subscribe(res => this.placeList = res.data);
    this.dic.getCteacherList().subscribe(res => this.cteacherList = res.data);
    if (this.teamId){
      this.http.get<JsonData>(`/teams/${this.teamId}`).subscribe(
        (data) => {
          let item = data.data;
          this.formModel.setValue({
            name: item.name,
            cteacher_user_id: item.cteacher_user_id,
            place_id: item.place_id,
            num: item.num,
          });
        }
      );
    }
  }

  save() {
    if(this.formModel.valid) {
      if (this.teamId) {
        this.http.put(`/teams/${this.teamId}`, this.formModel.value)
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
      else {
        this.http.post(`/teams`, this.formModel.value)
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
