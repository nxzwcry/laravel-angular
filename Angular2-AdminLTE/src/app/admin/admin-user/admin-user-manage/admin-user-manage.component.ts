import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {FormControl} from "@angular/forms";
// Variable in assets/js/scripts.js file
declare var AdminLTE: any;

@Component({
  selector: 'app-admin-user-manage',
  templateUrl: './admin-user-manage.component.html',
  styleUrls: ['./admin-user-manage.component.css']
})
export class AdminUserManageComponent implements OnInit {

    dataSource:Observable<any>;

    private keyword:string;

    private wordFilter:FormControl = new FormControl();

    users:Array<any> = [];

    constructor(private http: HttpClient) {
        this.dataSource = this.http.get('/api/users')
        this.wordFilter.valueChanges
            .debounceTime(500)
            .subscribe(
                value => this.keyword = value
            );
    }

    ngOnInit() {
        // Actualiza la barra latera y el footer
        AdminLTE.init();
        this.dataSource.subscribe(
            (data) => this.users = data.data
        );
    }
}
