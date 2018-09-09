import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import {DictionaryService} from "@shared/services/dictionary.service";
import { Observable, of } from 'rxjs';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Student} from "@shared/modules/student";
import {JsonData} from "@shared/shared.module";

@Component({
  selector: 'app-lessons-edit-course',
  templateUrl: './edit-course.component.html',
})
export class LessonsEditCourseComponent implements OnInit {
  loading: Boolean = false;
  typeList: Array<any>;
  fteacherList: Array<any>;
  cteacherList: Array<any>;
  dowList: Array<any>;
  placeList: Array<any>;
  formModel: FormGroup;
  req: any = {};
  listDisable = {
    type: false,
    always: true,
    fteacher_id: true,
    jingpin_cost: true,
    waijiao_cost: true,
  };
  always = true;
  @Input() userId: string;
  @Input() teamId: string;

  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient,
    private dic: DictionaryService,
    private fb: FormBuilder,
  ) {
    this.formModel = fb.group({
        name: [null, [Validators.required]],
        cteacher_id: [null],
        fteacher_id: [null],
        dow: [null, [Validators.required]],
        startTime: [null, [Validators.required]],
        endTime: [null, [Validators.required]],
        fteacherTime: [null],
        waijiao_cost: ['0'],
        zhongjiao_cost: ['0'],
        jingpin_cost: ['0'],
        lesson_type:[null, [Validators.required]],
        place_id: [null, [Validators.required]],
      }
    );
  }

  ngOnInit(): void {
    this.typeList = this.dic.getLessonTypeList();
    this.dowList = this.dic.getDowList();
    this.dic.getCteacherList().subscribe(res => this.cteacherList = res.data);
    this.dic.getFteacherList().subscribe(res => this.fteacherList = res.data);
    this.dic.getPlaceList().subscribe(res => this.placeList = res.data);
    if (this.teamId){
      this.listDisable.type = true;
      this.listDisable.always = false;
      this.listDisable.fteacher_id = false;
      this.listDisable.jingpin_cost = true;
      this.listDisable.waijiao_cost = false;
      this.formModel.patchValue({
        lesson_type: 'b',
      });
    }
  }

  selectChange($event){
    // console.log('select', $event);
    if($event == 'w'){
      this.listDisable.always = false;
      this.listDisable.fteacher_id = false;
      this.listDisable.jingpin_cost = true;
      this.listDisable.waijiao_cost = false;
      return;
    }
    else if($event == 'f'){
      this.listDisable.always = false;
      this.listDisable.fteacher_id = true;
      this.listDisable.jingpin_cost = true;
      this.listDisable.waijiao_cost = true;
      return;
    }
    else if($event == 'j'){
      this.listDisable.always = false;
      this.listDisable.fteacher_id = false;
      this.listDisable.jingpin_cost = false;
      this.listDisable.waijiao_cost = true;
      return;
    }
    this.listDisable = {
      type: false,
      always: true,
      fteacher_id: true,
      jingpin_cost: true,
      waijiao_cost: true,
    };
  }

  changeTime(time: Date){
    // console.log(time);
    if (time) {
      if(this.formModel.value.lesson_type == 'w'){
        this.formModel.patchValue({
          endTime: new Date(time.getTime()+25*60*1000),
          fteacherTime: new Date(time.getTime()),
        });
      }
      else if(this.formModel.value.lesson_type == 'f'){
        this.formModel.patchValue({
          endTime: new Date(time.getTime()+60*60*1000),
        });
      }
      else if(this.formModel.value.lesson_type == 'j'){
        this.formModel.patchValue({
          endTime: new Date(time.getTime()+60*60*1000),
          fteacherTime: new Date(time.getTime()),
        });
      }
      else if(this.formModel.value.lesson_type == 'b'){
        this.formModel.patchValue({
          endTime: new Date(time.getTime()+100*60*1000),
          fteacherTime: new Date(time.getTime()+30*60*1000),
        });
      }
    }
  }

  save() {
    if(this.formModel.valid) {
      Object.assign(this.req, this.formModel.value);
      this.req.start_time = this.req.startTime.getTime()/1000;
      this.req.end_time = this.req.endTime.getTime()/1000;
      if (this.req.fteacherTime){
        this.req.fteacher_time = this.req.fteacherTime.getTime()/1000;
      }
      delete this.req.startTime;
      delete this.req.endTime;
      delete this.req.fteacherTime;
      if (this.userId || this.teamId)
      {
        this.req.student_id = this.userId;
        this.req.team_id = this.teamId;
        this.http.post(`/courses`, this.req)
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
        console.log('未传入用户ID');
      }
      this.loading = true;
    }
  }

  close() {
    this.modal.destroy(false);
  }
}
