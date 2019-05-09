import { Injectable } from '@angular/core';

@Injectable()
export class SessionStorageService {

  public sessionStorage:any;

  constructor() {
    if (!sessionStorage) {
      throw new Error('Current browser does not support Session Storage');
    }
    this.sessionStorage = sessionStorage;

    if (!sessionStorage.length) {
      // Ask other tabs for session storage
      console.log('session为空');
      localStorage.setItem('getSessionStorage', JSON.stringify(Date.now()));
    };

    window.addEventListener('storage', function(event) {

      //console.log('storage event', event);

      if (event.key == 'getSessionStorage') {
        // Some tab asked for the sessionStorage -> send it
        console.log('发送session');
        localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
        localStorage.removeItem('sessionStorage');

      } else if (event.key == 'sessionStorage' && !sessionStorage.length) {
        // sessionStorage is empty -> fill it
        console.log('接收session');

        let data = JSON.parse(event.newValue),
          value;

        for (let key in data) {
          sessionStorage.setItem(key, data[key]);
        }

      }
    });
  }

  public set(key:string, value:string):void {
    this.sessionStorage[key] = value;
  }

  public get(key:string):string {
    return this.sessionStorage[key] || false;
  }

  public setObject(key:string, value:any):void {
    this.sessionStorage[key] = JSON.stringify(value);
  }

  public getObject(key:string):any {
    return JSON.parse(this.sessionStorage[key] || '{}');
  }

  public remove(key:string):any {
    this.sessionStorage.removeItem(key);
  }

}
