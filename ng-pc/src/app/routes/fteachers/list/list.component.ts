import { Component, OnInit } from '@angular/core';
import {_HttpClient, ModalHelper} from '@delon/theme';
import {FormControl} from "@angular/forms";
import {DictionaryService} from "../../../shared/services/dictionary.service";
import {debounceTime} from "rxjs/operators";
import {JsonData} from "../../../shared/shared.module";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {FteachersEditFteacherComponent} from "../edit-fteacher/edit-fteacher.component";

@Component({
  selector: 'app-users-list',
  templateUrl: './list.component.html',
})
export class FteachersListComponent implements OnInit {
  displayList: Array<any>;
  wordFilter:FormControl = new FormControl();
  searchWord: string;

  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private dic: DictionaryService,
    private modalService: NzModalService,
    public msgSrv: NzMessageService,
  ) { }

  ngOnInit() { }

  add() {
    this.modal.create(FteachersEditFteacherComponent, {size: 'sm'}, {
      modalOptions: {
        nzTitle: '添加外教',
        nzMaskClosable: false,
      }}).subscribe(res => this.reload(res) );
  }

  reload(b: Boolean) {
    if(b) this.load();
  }

  load() {
    // console.log(this.searchWord);
    if (this.wordFilter.value)
    {
      this.http.get<JsonData>(`/fteachers/search/${this.wordFilter.value}`).subscribe(
        (data) =>{
          this.displayList = data.data;
        }
      );
    }
  }

  change(id: string){
    this.modal.create(FteachersEditFteacherComponent, {size: 'sm'}, {modalOptions: {nzTitle: '修改外教信息',  nzComponentParams: {id: id}}}).subscribe(res => this.reload(res) );
  }

  delete(fteacherId){
    this.http.delete(`/fteachers/${fteacherId}`)
      .subscribe(res => {
          this.msgSrv.success('删除成功');
          this.load();
        },
        error => {
          console.log('post请求失败', error);
        }
      );
  }

}

