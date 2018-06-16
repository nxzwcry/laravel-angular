import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
// import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import {FormControl} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

// Variable in assets/js/scripts.js file
declare var AdminLTE: any;

@Component({
  selector: 'app-admin-studentlist-one2one',
  templateUrl: './admin-studentlist-one2one.component.html',
  styleUrls: ['./admin-studentlist-one2one.component.css']
})
export class AdminStudentlistOne2oneComponent implements OnInit {

    dataSource:Observable<any>;

    private keyword:string;

    private wordFilter:FormControl = new FormControl();

    students:Array<any> = [];
    // private students: Array<Student>;
    constructor(private http: HttpClient) {
        this.dataSource = this.http.get('/api/students');
        this.wordFilter.valueChanges
            .debounceTime(500)
            .subscribe(
                value => this.keyword = value
            );
    }
    // constructor(){
    //
    // }

    ngOnInit() {
        // Actualiza la barra latera y el footer
        AdminLTE.init();
        this.dataSource.subscribe(
            (data) => this.students = data.data
        );
        // this.students = [
        //   new Student(1,"第一个学生","One"),
        //   new Student(2,"第二个学生","Two"),
        //   new Student(3,"第三个学生","Three"),
        //   new Student(4,"第四个学生","Four"),
        //   new Student(5,"第五个学生","Five"),
        //   new Student(6,"第六个学生","Six"),
        // ]
    }

}

export class Student {
  constructor(
  public id:number,
  public name:string,
  public ename:string
  ){

  }
}