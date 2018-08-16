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
  id: number;
  ename: string;
  name: string;
}

export class Team {
  id: number;
  name: string;
}