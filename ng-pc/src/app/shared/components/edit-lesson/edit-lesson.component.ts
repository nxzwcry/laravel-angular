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
  selector: 'app-shared-edit-lesson',
  templateUrl: './edit-lesson.component.html',
})
export class SharedEditLessonComponent implements OnInit {
  loading: Boolean = false;
  typeList: Array<any>;
  fteacherList: Array<any>;
  cteacherList: Array<any>;
  placeList: Array<any>;
  statusList: Array<any>;
  formModel: FormGroup;
  req: any = {};
  listDisable = {
    type: false,
    always: true,
    fteacher_id: true,
    jingpin_cost: true,
    waijiao_cost: true,
    status: true,
  };
  always = true;
  @Input() userId: string;
  @Input() teamId: string;
  @Input() lessonId: string;

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
        date: [null, [Validators.required]],
        startTime: [null, [Validators.required]],
        endTime: [null, [Validators.required]],
        fteacherTime: [null],
        waijiao_cost: ['0'],
        zhongjiao_cost: ['0'],
        jingpin_cost: ['0'],
        lesson_type:[null, [Validators.required]],
        place_id: [null, [Validators.required]],
        status: [0],
        note: ['']
      }
    );
  }

  ngOnInit(): void {
    this.typeList = this.dic.getLessonTypeList();
    this.statusList = this.dic.getLessonStatusList();
    this.dic.getCteacherList().subscribe(res => this.cteacherList = res.data);
    this.dic.getFteacherList().subscribe(res => this.fteacherList = res.data);
    this.dic.getPlaceList().subscribe(res => this.placeList = res.data);
    if (this.teamId){
      this.selectChange('b');
      this.formModel.patchValue({
        lesson_type: 'b',
      });
      this.selectChange('b');
    }
    if (this.lessonId)
    {
      this.http.get<JsonData>(`/lessons/${this.lessonId}`).subscribe(
        (data) => {
          let item = data.data;
          this.formModel.setValue({
            name: item.name,
            cteacher_id: item.cteacher_id,
            fteacher_id: item.fteacher_id,
            date: new Date(item.date*1000),
            startTime: new Date(item.stime*1000),
            endTime: new Date(item.etime*1000),
            fteacherTime: item.fteacher_time ? new Date(item.fteacher_time*1000) : null,
            waijiao_cost: item.waijiao_cost,
            zhongjiao_cost: item.zhongjiao_cost,
            jingpin_cost: item.jingpin_cost,
            lesson_type: item.lesson_type_id,
            place_id: item.place_id,
            status: item.status,
            note: item.note,
          });
          // console.log('lesson_type', item.lesson_type_id);
          // this.selectChange(item.lesson_type_id);
          this.listDisable.type = true;
          if (item.lesson_type_id == 'bt')
          {
            this.listDisable.status = true;
          }
          else {
            this.listDisable.status = false;
          }
        }
      );
    }
  }

  selectChange($event){
    console.log('select', $event);
    if($event == 'w'){
      this.listDisable.always = false;
      this.listDisable.fteacher_id = false;
      this.listDisable.jingpin_cost = true;
      this.listDisable.waijiao_cost = false;
      this.listDisable.status = true;
      return;
    }
    else if($event == 'f'){
      this.listDisable.always = false;
      this.listDisable.fteacher_id = true;
      this.listDisable.jingpin_cost = true;
      this.listDisable.waijiao_cost = true;
      this.listDisable.status = true;
      return;
    }
    else if($event == 'j'){
      this.listDisable.always = false;
      this.listDisable.fteacher_id = false;
      this.listDisable.jingpin_cost = false;
      this.listDisable.waijiao_cost = true;
      this.listDisable.status = true;
      return;
    }
    else if($event == 'bu'){
      this.listDisable.always = false;
      this.listDisable.fteacher_id = true;
      this.listDisable.jingpin_cost = true;
      this.listDisable.waijiao_cost = true;
      this.listDisable.status = true;
      return;
    }
    else if($event == 'b' || $event == 'bt'){
      this.listDisable.type = true;
      this.listDisable.always = false;
      this.listDisable.fteacher_id = false;
      this.listDisable.jingpin_cost = true;
      this.listDisable.waijiao_cost = false;
      this.listDisable.status = true;
      return;
    }
    this.listDisable.type = false;
    this.listDisable.always = true;
    this.listDisable.fteacher_id = true;
    this.listDisable.jingpin_cost = true;

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
      let date = this.req.date;
      let stime = this.req.startTime;
      let etime = this.req.endTime;
      stime.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
      etime.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
      this.req.start_datetime = stime.getTime()/1000;
      this.req.end_datetime = etime.getTime()/1000;
      if (this.req.fteacherTime){
        let ftime = this.req.fteacherTime;
        ftime.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
        this.req.fteacher_datetime = ftime.getTime()/1000;
      }
      // this.req.start_datetime = '2018-09-02 15:00';
      // this.req.end_datetime = '2018-09-02 15:30';
      delete this.req.date;
      delete this.req.startTime;
      delete this.req.endTime;
      delete this.req.fteacherTime;
      // console.log(this.req, stime, etime);
      if (this.lessonId)
      {
        delete this.req.lesson_type;
        this.http.put(`/lessons/${this.lessonId}`, this.req)
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
        if (this.teamId)
        {
          // this.req = this.formModel.value;
          this.req.team_id = this.teamId;
          this.http.post(`/lessons/team`, this.req)
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
          if (this.userId)
          {
            // this.req = this.formModel.value;
            this.req.student_id = this.userId;
            this.http.post(`/lessons`, this.req)
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
        }
      }
      this.loading = true;
    }
  }

  close() {
    this.modal.destroy(false);
  }
}
