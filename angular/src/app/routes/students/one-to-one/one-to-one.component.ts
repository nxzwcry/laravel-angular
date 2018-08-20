import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { SimpleTableFilter, SimpleTableColumn, SimpleTableComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { Observable, of } from 'rxjs';
import {FormControl} from "@angular/forms";
import { fromEvent, timer } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import {JsonData} from "@shared/shared.module";

@Component({
  selector: 'app-students-one-to-one',
  templateUrl: './one-to-one.component.html',
})
export class StudentsOneToOneComponent implements OnInit {
  studentList:Array<any>;
  private wordFilter:FormControl = new FormControl();
  searchWord: string;
  @ViewChild('st') st: SimpleTableComponent;
  columns: SimpleTableColumn[] = [
    { title: '编号', index: 'id', width: "2em", sorter: (a, b) => a.id - b.id },
    { title: '姓名', index: 'name', width: "4em" },
    { title: '英文名', index: 'ename', width: "4em" },
    { title: '剩余外教', type: 'number', index: 'waijiao', width: "4em", sorter: (a, b) => a.waijiao - b.waijiao},
    { title: '中教老师', index: 'cteacher', width: "4em" },
    { title: '外教老师', index: 'fteacher', width: "4em" },
    { title: '课程顾问', index: 'agent', width: "4em" },
    // {
    //   title: '',
    //   buttons: [
    //     // { text: '查看', click: (item: any) => `/form/${item.id}` },
    //     // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
    //   ]
    // }
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper) {
    this.wordFilter.valueChanges
      .pipe(debounceTime(500))
      .subscribe(
        value => this.searchWord = value
      );
  }

  ngOnInit() {
    this.http.get<JsonData>('/students').subscribe(
      (data) => this.studentList = data.data
    );
  }

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }

}
