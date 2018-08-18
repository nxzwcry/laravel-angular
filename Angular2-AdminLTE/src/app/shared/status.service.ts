import { Injectable } from '@angular/core';
import {SessionStorageService} from "./session-storage.service";


@Injectable()
export class StatusService {

  student: Student;
  team: Team;

  constructor(private ss:SessionStorageService) {
  }

  public setStudent(value:Student) {
    this.ss.setObject("student", value);
  }

  public getStudent() {
    return this.ss.getObject("student");
  }

  public setTeam(value:Team) {
    this.ss.setObject("team", value);
  }

  public getTeam() {
    return this.ss.getObject("team");
  }

}

export class Student {
  /**
   *
   * @param {number} id
   * @param {string} ename
   * @param {string} name
   * @param {number} cteacher_user_id
   * @param {number} agent_user_id
   */
  constructor(
    public id: number,
    public ename: string,
    public name: string,
    public cteacher_user_id: number,
    public agent_user_id:number
  ){  }
  // id: number;
  // ename: string;
  // name: string;
  // cteacher_user_id: number;
  // agent_user_id:number;
}

export class Team {
  id: number;
  name: string;
}