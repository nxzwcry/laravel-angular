import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import {_HttpClient, SettingsService} from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import {DictionaryService} from "@shared/services/dictionary.service";
import { Observable, of } from 'rxjs';
import {AbstractControl, FormBuilder, FormGroup, Validators, FormControl, FormArray} from "@angular/forms";
import {Student} from "@shared/modules/student";
import {JsonData} from "@shared/shared.module";
import {forEach} from "@angular/router/src/utils/collection";
import {ACLService} from "@delon/acl";

@Component({
  selector: 'app-shared-edit-student',
  templateUrl: './edit-student.component.html',
})
export class SharedEditStudentComponent implements OnInit {
  loading: Boolean = false;
  sexList: Array<any> = [];
  gradeList: Array<any> = [];
  cteacherList: Array<any> = [];
  agentList: Array<any> = [];
  formModel: FormGroup;
  req: any = {};
  @Input() id: string;
  listDisable = {
    name: false,
    ename: false,
    sex: false,
    birthday: false,
    grade: false,
    cteacher_user_id: false,
    agent_user_id: false,
    email: false,
    address: false,
    desc: false,
    phones:false,
  };
  putUrl = "/students/";

  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient,
    private dic: DictionaryService,
    private fb: FormBuilder,
    private aclService: ACLService,
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
        phones:this.fb.array([
          this.createForm()
        ]),
      }
    );
  }

  private createForm(id:number = 0, name: string = null, phone_number: string = null){
    return this.fb.group({
        id: [id],
        name: [name, [Validators.required]],
        phone_number: [phone_number, [Validators.required]],
      }
    );
  }

  ngOnInit(): void {
    if (!this.aclService.can('admin'))
    {
      this.putUrl = "/students/changeInfo/";
      if (this.aclService.can('cteacher'))
      {
        this.listDisable.name = true;
        this.listDisable.sex = true;
        this.listDisable.birthday = true;
        this.listDisable.grade = true;
        this.listDisable.cteacher_user_id = true;
        this.listDisable.agent_user_id = true;
        this.listDisable.email = true;
        this.listDisable.address = true;
        this.listDisable.desc = true;
        this.listDisable.phones = true;
      }
      else {
        this.listDisable.name = true;
        this.listDisable.sex = true;
        this.listDisable.ename = true;
        this.listDisable.cteacher_user_id = true;
        this.listDisable.agent_user_id = true;
      }
    }
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
            phones: [
              {id: 0, name: '', phone_number: '' },
            ],
          });
          if (item.phones[0])
          {
            // console.log(this.phonesFromArray);
            this.phonesFromArray.removeAt(0);
            for (let phone of item.phones)
            {
              this.phonesFromArray.push(this.createForm(phone.id, phone.name, phone.phone_number));
            }
          }
        }
      );
    }
  }

  addField(): void {
    this.phonesFromArray.push(this.createForm());
  }

  removeField(i: number): void {
    if (this.phonesFromArray.length > 1) {
      // 检测是否含有id信息，如果有需要从后台删除
      let phoneId = this.phonesFromArray.at(i).value.id;
      if(phoneId)
      {
        this.http.delete(`/phone/${phoneId}`)
          .subscribe(res => {
              this.phonesFromArray.removeAt(i);
            },
            error => {
              console.log('电话删除失败', error);
            }
          );
      }
      else {
        this.phonesFromArray.removeAt(i);
      }
    }
  }

  get phonesFromArray() {
    return this.formModel.get('phones') as FormArray;
  }

  save() {
    if(this.formModel.valid) {
      this.req = this.formModel.value;
      if(this.req.birthday){
        this.req.birthday = this.req.birthday.getTime()/1000;
      }
      // console.log(this.req.birthday.valueOf());
      if (this.id) {
        this.http.put(this.putUrl+this.id, this.formModel.value)
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
    this.modal.destroy(true);
  }
}
