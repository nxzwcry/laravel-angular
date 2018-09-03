import { Component, OnInit, ViewChild } from '@angular/core';
import {_HttpClient, ModalHelper, SettingsService} from '@delon/theme';
import { SimpleTableFilter, SimpleTableColumn, SimpleTableComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { Observable, of } from 'rxjs';
import {FormControl} from "@angular/forms";
import { fromEvent, timer } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import {JsonData} from "@shared/shared.module";
import {StudentsEditStudentComponent} from "../edit-student/edit-student.component";
import {NzModalRef} from "ng-zorro-antd";
import {DictionaryService} from "@shared/services/dictionary.service";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-students-one-to-one',
  templateUrl: './one-to-one.component.html',
})
export class StudentsOneToOneComponent implements OnInit {
  displayList: Array<any>;
  studentList: Array<any>;
  private wordFilter:FormControl = new FormControl();
  searchWord: string;
  listOfSearchAgent = [ ];
  sortName = 'id';
  sortValue = 'descend';
  userid: number;
  // agentList = [
  //   // { text: 'Emmanuelle Graham', value: 'Emmanuelle Graham', byDefault: true },
  //   { text: 'Emmanuelle Graham', value: 'Emmanuelle Graham' },
  //   { text: '祁琪', value: '祁琪' }
  // ];
  agentList = [];
  // @ViewChild('st') st: SimpleTableComponent;
  // columns: SimpleTableColumn[] = [
  //   { title: '编号', index: 'id', width: "2em", sorter: (a, b) => a.id - b.id },
  //   // { title: '姓名', index: 'name', width: "4em" },
  //   { title: '姓名', type: 'link', index: 'name', click: (item: any) => ['/students/student', item.id], width: "4em" },
  //   { title: '英文名', index: 'ename', width: "4em" },
  //   { title: '剩余外教', type: 'number', index: 'waijiao', width: "4em", sorter: (a, b) => a.waijiao - b.waijiao},
  //   { title: '中教老师', index: 'cteacher', width: "4em" },
  //   { title: '外教老师', index: 'fteacher', width: "4em" },
  //   { title: '课程顾问', index: 'agent', width: "4em" },
  // ];

  constructor(private http: _HttpClient,
              private modal: ModalHelper,
              private dic: DictionaryService,
              private settingService: SettingsService,
              ) { }

  ngOnInit() {
    this.userid = this.settingService.user.id;
    this.wordFilter.valueChanges
      .pipe(debounceTime(500))
      .subscribe(
        value => this.searchWord = value
      );
    this.dic.getAgentList().subscribe(res =>{
      let temp = [];
      let searchTemp = [];
      for(let item of res.data){
        if (item.id == this.userid){
          temp.push({ text: item.name, value: item.name, byDefault: true });
          searchTemp.push(item.name);
        }
        else{
          temp.push({ text: item.name, value: item.name });
        }
      }
      this.listOfSearchAgent = searchTemp;
      this.agentList = temp;
      this.load();
    });
  }

  add() {
    this.modal.create(StudentsEditStudentComponent, {size: 'sm'}, {modalOptions: {nzTitle: '添加学生'}}).subscribe(res => this.reload(res) );
  }

  reload(b: Boolean)
  {
    if(b) this.load();
  }

  load() {
    this.http.get<JsonData>('/students').subscribe(
      (data) =>{ this.studentList = data.data;
        this.search();
        // this.displayList = this.studentList;
      }
    );
  }

  sort(sort: { key: string, value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  filter(listOfSearchAgent: string[]): void {
    this.listOfSearchAgent = listOfSearchAgent;
    // console.log('filterevent', listOfSearchAgent);
    this.search();
  }

  search(): void {
    /** filter data **/
    const filterFunc = item => (this.listOfSearchAgent.length ? this.listOfSearchAgent.some(name => item.agent.indexOf(name) !== -1) : true);
    const data = this.studentList.filter(item => filterFunc(item));
    /** sort data **/
    if (this.sortName && this.sortValue) {
      this.displayList = data.sort((a, b) => (this.sortValue === 'ascend') ? (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
    } else {
      this.displayList = data;
    }
  }

}
