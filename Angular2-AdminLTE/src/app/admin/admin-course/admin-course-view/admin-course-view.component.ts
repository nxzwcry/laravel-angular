import { Component, OnInit } from '@angular/core';
// Variable in assets/js/scripts.js file
declare var AdminLTE: any;

@Component({
  selector: 'app-admin-course-view',
  templateUrl: './admin-course-view.component.html',
  styleUrls: ['./admin-course-view.component.css']
})
export class AdminCourseViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // Actualiza la barra latera y el footer
    AdminLTE.init();
  }

}
