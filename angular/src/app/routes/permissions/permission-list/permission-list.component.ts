import { Component, OnInit } from '@angular/core';
import {_HttpClient, ModalHelper} from '@delon/theme';
import {FormControl} from "@angular/forms";
import {debounceTime} from "rxjs/operators";
import {JsonData} from "../../../shared/shared.module";
import {PermissionsAddComponent} from "../add/add.component";

@Component({
  selector: 'app-permissions-permission-list',
  templateUrl: './permission-list.component.html',
})
export class PermissionsPermissionListComponent implements OnInit {
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
    this.http.get<JsonData>('/permissions').subscribe(
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
            nzTitle: '增加权限',
            nzComponentParams: {
              url: '/permissions',
            },
            nzMaskClosable: false,
          }
      }).subscribe(res => this.reload(res) );
  }

}
