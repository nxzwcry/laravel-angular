import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Http} from "@angular/http";

@Injectable()
export class ListService {

  constructor(private http: Http) {
  }

  getCteachers() : Observable<any> {

    return this.http.get('/api/cteachers')
      .map((res) => res.json());
    // return [
    //     new User(1, "徐春春", "CC"),
    //     new User(2, "宋东静", "Maggie"),
    //     new User(3, "张爽", "Shane"),
    //     new User(4, "张露", "Rose"),
    // ];
  }

  getAgents() : Observable<any> {

    return this.http.get('/api/agents')
      .map((res) => res.json());
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