import { Component, OnInit } from '@angular/core';
// Variable in assets/js/scripts.js file
declare var AdminLTE: any;

@Component({
  selector: 'app-admin-course-lessons',
  templateUrl: './admin-course-lessons.component.html',
  styleUrls: ['./admin-course-lessons.component.css']
})
export class AdminCourseLessonsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // Actualiza la barra latera y el footer
    AdminLTE.init();
  }

}
