import { Injectable } from '@angular/core';
import {SessionStorageService} from "./session-storage.service";

@Injectable()
export class AuthService {

  constructor(private ss:SessionStorageService) { }

  public setToken(value:string) {
    this.ss.set("token", value);
  }

  public getToken() {
    return this.ss.get("token");
  }

  public removeToken() {
    this.ss.remove("token");
  }

}
