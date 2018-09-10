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
  private wordFilter:FormControl = new FormControl();
  searchWord: string;
  dowList: Array<any>;

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
    this.modal.create(TeamsEditTeamComponent, {size: 'sm'}, {modalOptions: {nzTitle: '添加班级'}}).subscribe(res => this.reload(res) );
  }

  reload(b: Boolean)
  {
    if(b) this.load();
  }

  load() {
    this.http.get<JsonData>('/teams').subscribe(
      (data) =>{
        this.displayList = data.data;
      }
    );
  }

}
