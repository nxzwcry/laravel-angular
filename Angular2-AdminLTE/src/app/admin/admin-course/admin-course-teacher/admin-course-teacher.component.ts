import { Component, OnInit } from '@angular/core';
// Variable in assets/js/scripts.js file
declare var AdminLTE: any;

@Component({
  selector: 'app-admin-course-teacher',
  templateUrl: './admin-course-teacher.component.html',
  styleUrls: ['./admin-course-teacher.component.css']
})
export class AdminCourseTeacherComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // Actualiza la barra latera y el footer
    AdminLTE.init();
  }

}
