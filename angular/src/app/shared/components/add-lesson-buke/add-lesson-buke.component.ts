import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import {DictionaryService} from "@shared/services/dictionary.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-shared-add-lesson-buke',
  templateUrl: './add-lesson-buke.component.html',
})
export class SharedAddLessonBukeComponent implements OnInit {
  loading: Boolean = false;
  cteacherList: Array<any>;
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
        cteacher_id: [null, [Validators.required]],
        startTime: [null, [Validators.required]],
      }
    );
  }

  ngOnInit(): void {
    this.dic.getCteacherList().subscribe(res => this.cteacherList = res.data);
  }

  save() {
    if(this.formModel.valid) {
      Object.assign(this.req, this.formModel.value);
      this.req.start_datetime = this.req.startTime.getTime()/1000;
      this.req.end_datetime = (this.req.startTime.getTime()+30*60*1000)/1000;
      delete this.req.startTime;
      if (this.lessonId)
      {
        this.http.put(`/lessons/buke/${this.lessonId}`, this.req)
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
