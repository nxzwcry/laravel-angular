import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {JsonData} from "@shared/shared.module";

@Component({
  selector: 'app-shared-edit-lesson-score',
  templateUrl: './edit-lesson-score.component.html',
})
export class SharedEditLessonScoreComponent implements OnInit {
  loading: Boolean = false;
  formModel: FormGroup;
  req: any = {};
  @Input() lessonId: string;

  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient,
    private fb: FormBuilder,
  ) {
    this.formModel = fb.group({
        score: [null],
      }
    );
  }

  ngOnInit(): void {
    if (this.lessonId){
      this.http.get<JsonData>(`/lessons/${this.lessonId}`).subscribe(
        (data) => {
          let item = data.data;
          this.formModel.setValue({
            score: item.score,
          });
        }
      );
    }
  }

  save() {
    if(this.formModel.valid) {
      if (this.lessonId)
      {
        this.http.put(`/lessons/${this.lessonId}`, this.formModel.value)
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
