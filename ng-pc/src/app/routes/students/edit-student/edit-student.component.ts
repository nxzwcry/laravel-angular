import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import {DictionaryService} from "@shared/services/dictionary.service";
import { Observable, of } from 'rxjs';
import {AbstractControl, FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import {Student} from "@shared/modules/student";
import {JsonData} from "@shared/shared.module";

@Component({
  selector: 'app-students-edit-student',
  templateUrl: './edit-student.component.html',
})
export class StudentsEditStudentComponent implements OnInit {
  loading: Boolean = false;
  sexList: Array<any> = [];
  gradeList: Array<any> = [];
  cteacherList: Array<any> = [];
  agentList: Array<any> = [];
  formModel: FormGroup;
  req: any = {};
  controlArray: Array<{id: number; controlInstance: string}> = [];
  @Input() id: string;

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
        sex: [null, [Validators.required]],
        birthday: [null],
        grade: [null, [Validators.required]],
        cteacher_user_id:['0'],
        agent_user_id:['0'],
        email: [null],
        address: [null],
        desc: [''],
        phones:this.fb.group({}),
      }
    );
    this.addField();
  }

  ngOnInit(): void {
    this.sexList = this.dic.getSexList();
    this.gradeList = this.dic.getGradeList();
    this.dic.getCteacherList().subscribe(res => this.cteacherList = res.data);
    this.dic.getAgentList().subscribe(res => this.agentList = res.data);
    if (this.id){
      this.http.get<JsonData>(`/students/${this.id}`).subscribe(
        (data) => {
          let item = data.data;
          this.formModel.setValue({
            name: item.name,
            ename: item.ename,
            sex: item.sex,
            birthday: item.birthday ? new Date(item.birthday*1000) : null,
            grade: item.grade,
            cteacher_user_id: item.cteacher_user_id,
            agent_user_id: item.agent_user_id,
            email: item.email,
            address: item.address,
            desc: item.desc,
          });
        }
      );
    }
  }

  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id = this.controlArray.length > 0 ? this.controlArray[this.controlArray.length - 1].id + 1 : 0;

    const control = {
      id,
      controlInstance: `passenger${id}`
    };
    const index = this.controlArray.push(control);
    // console.log(this.controlArray[this.controlArray.length - 1]);
    this.phones.addControl(
      this.controlArray[index - 1].controlInstance,
      new FormControl(null, Validators.required)
    );
  }

  removeField(i: { id: number; controlInstance: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.controlArray.length > 1) {
      const index = this.controlArray.indexOf(i);
      this.controlArray.splice(index, 1);
      // console.log(this.controlArray);
      this.phones.removeControl(i.controlInstance);
    }
  }

  get phones() {
    return this.formModel.get('phones') as FormGroup;
  }

  getFormControl(name: string): AbstractControl {
    return this.phones.controls[name];
  }

  save() {
    if(this.formModel.valid) {
      this.req = this.formModel.value;
      if(this.req.birthday){
        this.req.birthday = this.req.birthday.getTime()/1000;
      }
      // console.log(this.req.birthday.valueOf());
      if (this.id) {
        this.http.put(`/students/${this.id}`, this.formModel.value)
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
        this.http.post<Student>('/students', this.formModel.value)
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
    // this.http.post(`/students`, value).subscribe(res => {
    //   this.msgSrv.success('保存成功');
    //   this.modal.close(true);
    // });
  }

  close() {
    this.modal.destroy(false);
  }
}
