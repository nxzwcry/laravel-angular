import { Component, OnInit, ViewChild } from '@angular/core';
import {_HttpClient, ModalHelper, SettingsService} from '@delon/theme';
import {FormControl} from "@angular/forms";
import { debounceTime, map } from 'rxjs/operators';
import {JsonData} from "@shared/shared.module";
import {DictionaryService} from "@shared/services/dictionary.service";
import {ACLService} from "@delon/acl";

@Component({
  selector: 'app-students-team-students',
  templateUrl: './team-students.component.html',
})
export class StudentsTeamStudentsComponent implements OnInit {
  displayList: Array<any>;
  studentList: Array<any>;
  wordFilter:FormControl = new FormControl();
  searchWord: string;
  listOfSearchAgent = [ ];
  sortName = 'id';
  sortValue = 'descend';
  userid: number;
  agentList = [];
  loading = true;

  constructor(private http: _HttpClient,
              private modal: ModalHelper,
              private dic: DictionaryService,
              private settingService: SettingsService,
              private acl: ACLService,
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
      let search = this.acl.can("agent") && !this.acl.can("cteacher");
      for(let item of res.data){
        if ( item.id == this.userid && search ){
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

  reload(b: Boolean)
  {
    if(b) this.load();
  }

  load() {
    this.loading = true;
    this.http.get<JsonData>('/students/type/team').subscribe(
      (data) =>{
        this.studentList = data.data;
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
