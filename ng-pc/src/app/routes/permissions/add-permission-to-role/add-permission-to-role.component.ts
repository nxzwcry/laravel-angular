import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import {JsonData} from "@shared/shared.module";
import {Student} from "@shared/modules/student";

@Component({
  selector: 'app-permissions-add-permission-to-role',
  templateUrl: './add-permission-to-role.component.html',
})
export class PermissionsAddPermissionToRoleComponent implements OnInit {
  displayList: any[] = [];
  permissions: any[];
  role: any = {};
  @Input() id: string;

  constructor(
    private modal: NzModalRef,
    public http: _HttpClient,
  ) { }

  ngOnInit(): void {
    this.http.get<JsonData>('/permissions').subscribe(
      (data1) =>{
        this.permissions = data1.data;
        this.http.get<JsonData>(`/roles/${this.id}`).subscribe(
          (data2) =>{
            this.role = data2.data;
            let temp = [];
            for(let item of this.permissions){
              let index = temp.push({
                key: item.id,
                title: item.cn_name,
              });
              if(this.role.permissions.some(permission => permission.id == item.id )){
                temp[index-1].direction = 'right'
              }
            }
            this.displayList = temp;
          });
      }
    );
  }

  close() {
    this.modal.destroy(true);
  }

  select(ret: transfer): void {
    console.log('nzSelectChange', ret);
  }

  change(ret: transfer): void {
    console.log('nzChange', ret);
    let req = [];
    for(let item of ret.list){
      req.push(item.key);
    }
    if(ret.from == 'left'){
      this.http.put(`/roles/add/${this.id}`, req)
        .subscribe(
          (val) => {
            console.log('保存成功', val);
          },
          error => {
            console.log('post请求失败', error);
          }
        );
    }
    else{
      this.http.put(`/roles/remove/${this.id}`, req)
        .subscribe(
          (val) => {
            console.log('保存成功', val);
          },
          error => {
            console.log('post请求失败', error);
          }
        );
    }
  }
}

class transfer {
  list: any[];
  from: string;
}
