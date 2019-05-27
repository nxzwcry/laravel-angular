import { Component, OnInit } from '@angular/core';
import {_HttpClient, ModalHelper} from '@delon/theme';
import {FormControl} from "@angular/forms";
import {DictionaryService} from "../../../shared/services/dictionary.service";
import {debounceTime} from "rxjs/operators";
import {JsonData} from "../../../shared/shared.module";
import {NzModalService} from "ng-zorro-antd";
import {UsersEditUserComponent} from "../edit-user/edit-user.component";

@Component({
  selector: 'app-users-list',
  templateUrl: './list.component.html',
})
export class UsersListComponent implements OnInit {
  displayList: Array<any>;
  userList: Array<any>;
  wordFilter:FormControl = new FormControl();
  searchWord: string;
  listOfSearchRole = [ ];
  sortName = 'id';
  sortValue = 'ascend';
  roleList = [
    {text: "管理员", value: "管理员"},
    {text: "销售顾问", value: "销售顾问"},
    {text: "中教老师", value: "中教老师"},
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper, private dic: DictionaryService, private modalService: NzModalService) { }

  ngOnInit() {
    this.wordFilter.valueChanges
      .pipe(debounceTime(500))
      .subscribe(
        value => this.searchWord = value
      );
    this.load();
  }

  add() {
    this.modal.create(UsersEditUserComponent, {size: 'sm'}, {
      modalOptions: {
        nzTitle: '添加用户',
        nzMaskClosable: false,
      }}).subscribe(res => this.reload(res) );
  }

  reset(email: string) {
    this.http.post('/sendResetEmail', {email: email})
      .subscribe(
        (val) => {
          this.modalService.info({
            nzTitle: '密码重置邮件已发送',
            nzContent: '<p>请通知用户查看邮箱重置密码，该邮件在10分钟内有效</p>',
            nzOnOk: () => console.log('Info OK')
          });
        },
        error => {
          this.modalService.error({
            nzTitle: '密码重置失败',
            nzContent: error.errors.email
          });
        }
      );
  }

  reload(b: Boolean) {
    if(b) this.load();
  }

  load() {
    this.http.get<JsonData>('/users').subscribe(
      (data) =>{ this.userList = data.data;
        this.search();
      }
    );
  }

  sort(sort: { key: string, value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  filter(listOfSearchRole: string[]): void {
    this.listOfSearchRole = listOfSearchRole;
    this.search();
  }

  search(): void {
    /** filter data **/
    const filterFunc = item => (this.listOfSearchRole.length ? this.listOfSearchRole.some(name => item.role.indexOf(name) !== -1) : true);
    const data = this.userList.filter(item => filterFunc(item));
    /** sort data **/
    if (this.sortName && this.sortValue) {
      this.displayList = data.sort((a, b) => (this.sortValue === 'ascend') ? (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
    } else {
      this.displayList = data;
    }
  }

  change(id: string){
    this.modal.create(UsersEditUserComponent, {size: 'sm'}, {modalOptions: {nzTitle: '修改资料',  nzComponentParams: {id: id}}}).subscribe(res => this.reload(res) );
  }

}