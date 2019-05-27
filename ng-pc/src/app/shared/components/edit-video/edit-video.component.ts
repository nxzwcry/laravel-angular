import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {JsonData} from "@shared/shared.module";

@Component({
  selector: 'app-shared-edit-video',
  templateUrl: './edit-video.component.html',
})
export class SharedEditVideoComponent implements OnInit {
  loading: Boolean = false;
  formModel: FormGroup;
  @Input() videoId: string;
  @Input() lessonId: string;

  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient,
    private fb: FormBuilder,
  ) {
    this.formModel = fb.group({
        url_type: ["1", [Validators.required]],
        url: [null, [Validators.required]],
      }
    );
  }

  ngOnInit(): void {
    if (this.videoId)
    {
      this.http.get<JsonData>(`/video/${this.videoId}`).subscribe(
        (data) => {
          let item = data.data;
          this.formModel.setValue({
            url: item.url,
            url_type: item.url_type,
          });
        }
      );
    }
  }

  save() {
    if(this.formModel.valid) {
      if (this.videoId)
      {
        this.http.put<BackData>(`/video/${this.videoId}`, this.formModel.value)
          .subscribe(
            (val) => {
              this.msgSrv.success('保存成功');
              this.modal.close(val.data);
            },
            error => {
              console.log('post请求失败', error);
              this.loading = false;
            }
          );
      }
      else{
        this.http.post<BackData>(`/video/${this.lessonId}`, this.formModel.value)
          .subscribe(
            (val) => {
              this.msgSrv.success('保存成功');
              this.modal.close(val.data);
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

class BackData {
  data: any;
}
