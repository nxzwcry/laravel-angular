import { Component, OnInit, ViewChild } from '@angular/core';
import {_HttpClient, ModalHelper } from '@delon/theme';
import {FormControl} from "@angular/forms";
import { debounceTime, map } from 'rxjs/operators';
import {JsonData} from "@shared/shared.module";
import {StudentsEditStudentComponent} from "../edit-student/edit-student.component";
import {StudentsEditTeamComponent} from "../edit-team/edit-team.component";

@Component({
  selector: 'app-students-teams',
  templateUrl: './teams.component.html',
})
export class StudentsTeamsComponent implements OnInit {
  displayList: Array<any>;
  private wordFilter:FormControl = new FormControl();
  searchWord: string;

  constructor(private http: _HttpClient,
              private modal: ModalHelper,
              ) { }

  ngOnInit() {
    this.wordFilter.valueChanges
      .pipe(debounceTime(500))
      .subscribe(
        value => this.searchWord = value
      );
    this.load();
  }

  add() {
    this.modal.create(StudentsEditTeamComponent, {size: 'sm'}, {modalOptions: {nzTitle: '添加班级'}}).subscribe(res => this.reload(res) );
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
