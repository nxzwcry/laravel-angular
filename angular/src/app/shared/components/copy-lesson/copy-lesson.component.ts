import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import {DictionaryService} from "@shared/services/dictionary.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {JsonData} from "@shared/shared.module";

@Component({
  selector: 'app-shared-copy-lesson',
  templateUrl: './copy-lesson.component.html',
})
export class SharedCopyLessonComponent implements OnInit {
  loading: Boolean = false;
  studentsList: Array<any>;
  formModel: FormGroup;
  req: any = {};
  @Input() lessonId: string;

  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient,
    private dic: DictionaryService,
    private fb: FormBuilder,
  ) {
    this.formModel = fb.group({
        students: [null, [Validators.required]],
      }
    );
  }

  ngOnInit(): void {
    this.http.get<JsonData>(`/lessons/copy/${this.lessonId}`).subscribe(
      (data) => {
        this.studentsList = data.data;
        });
  }

  save() {
    if(this.formModel.valid) {
      if (this.lessonId)
      {
        this.http.post(`/lessons/copy/${this.lessonId}`, this.formModel.value)
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
        console.log('未传入课程ID');
      }

      this.loading = true;
    }
  }

  close() {
    this.modal.destroy(false);
  }
}
