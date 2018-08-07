import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ListService {

  public sex:Array<string>;
  public grade:Array<string>;

  constructor(private http: HttpClient) {
    this.sex = ['男', '女'];
    this.grade = ['学龄前0', '学龄前1', '学龄前2', '学龄前3', '学龄前4', '学龄前5', '学龄前6', '一年级', '二年级', '三年级', '四年级', '五年级', '六年级', '初一', '初二', '初三', '高一', '高二', '高三', '成人'];
  }

  getCteachers() : Observable<any> {

    return this.http.get('/api/cteachers');
    // return [
    //     new User(1, "徐春春", "CC"),
    //     new User(2, "宋东静", "Maggie"),
    //     new User(3, "张爽", "Shane"),
    //     new User(4, "张露", "Rose"),
    // ];
  }

  getAgents() : Observable<any> {

    return this.http.get('/api/agents');
  }

}

// export class User {
//   constructor(
//       public id:number,
//       public name:string,
//       public ename:string,
//   ){
//
//   }
// }