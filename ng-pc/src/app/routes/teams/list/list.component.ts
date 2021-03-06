import { Component, OnInit, ViewChild } from '@angular/core';
import {_HttpClient, ModalHelper } from '@delon/theme';
import {FormControl} from "@angular/forms";
import { debounceTime, map } from 'rxjs/operators';
import {JsonData} from "@shared/shared.module";
import {DictionaryService} from "@shared/services/dictionary.service";
import {TeamsEditTeamComponent} from "../edit-team/edit-team.component";

@Component({
  selector: 'app-teams-list',
  templateUrl: './list.component.html',
})
export class TeamsListComponent implements OnInit {
  displayList: Array<any>;
  wordFilter:FormControl = new FormControl();
  searchWord: string;
  dowList: Array<any>;
  sortName = 'num';
  sortValue = 'ascend';
  loading = true;

  constructor(private http: _HttpClient,
              private modal: ModalHelper,
              private dic: DictionaryService,
              ) { }

  ngOnInit() {
    this.dowList = this.dic.getDowList();
    this.wordFilter.valueChanges
      .pipe(debounceTime(500))
      .subscribe(
        value => this.searchWord = value
      );
    this.load();
  }

  add() {
    this.modal.create(TeamsEditTeamComponent, {size: 'sm'}, {
      modalOptions: {
        nzTitle: '添加班级',
        nzMaskClosable: false,
      }}).subscribe(res => this.reload(res) );
  }

  reload(b: Boolean)
  {
    if(b) this.load();
  }

  load() {
    this.loading = true;
    this.http.get<JsonData>('/teams').subscribe(
      (data) =>{
        this.displayList = data.data;
        this.search();
        this.loading = false;
      }
    );
  }

  sort(sort: { key: string, value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  search(): void {
    /** filter data **/
    const filterFunc = item => true;
    const data = this.displayList.filter(item => filterFunc(item));
    /** sort data **/
    if (this.sortName && this.sortValue) {
      this.displayList = data.sort((a, b) => (this.sortValue === 'ascend') ? (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
    }
    // this.displayList= Object.assign({},this.displayList);
  }

}
