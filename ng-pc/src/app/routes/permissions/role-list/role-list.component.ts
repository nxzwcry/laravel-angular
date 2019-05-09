import { Component, OnInit } from '@angular/core';
import {_HttpClient, ModalHelper} from '@delon/theme';
import {FormControl} from "@angular/forms";
import {JsonData} from "../../../shared/shared.module";
import {debounceTime} from "rxjs/operators";
import {PermissionsAddComponent} from "../add/add.component";
import {PermissionsAddPermissionToRoleComponent} from "../add-permission-to-role/add-permission-to-role.component";

@Component({
  selector: 'app-permissions-role-list',
  templateUrl: './role-list.component.html',
})
export class PermissionsRoleListComponent implements OnInit {
  displayList: Array<any>;
  wordFilter:FormControl = new FormControl();
  searchWord: string;

  constructor(private http: _HttpClient, private modal: ModalHelper) { }

  ngOnInit() {
    this.wordFilter.valueChanges
      .pipe(debounceTime(500))
      .subscribe(
        value => this.searchWord = value
      );
    this.load();
  }

  load(){
    this.http.get<JsonData>('/roles').subscribe(
      (data) =>{ this.displayList = data.data;
      }
    );
  }

  reload(b: Boolean)
  {
    if(b) this.load();
  }

  delete() {

  }

  add() {
    this.modal.create(
      PermissionsAddComponent,
      {size: 'sm'},
      {
        modalOptions:
          {
            nzTitle: '增加角色',
            nzComponentParams: {
              url: '/roles',
            },
            nzMaskClosable: false,
          }
      }).subscribe(res => this.reload(res) );
  }

  change(name: string, id: string) {
    this.modal.create(
      PermissionsAddPermissionToRoleComponent,
      {size: 'sm'},
      {
        modalOptions:
          {
            nzTitle: `${name}权限更改`,
            nzComponentParams: {
              id: id,
            },
          }
      }).subscribe(res => this.reload(res) );
  }

}
