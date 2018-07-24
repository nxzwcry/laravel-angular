import { Component, OnInit } from '@angular/core';
// Variable in assets/js/scripts.js file
declare var AdminLTE: any;

@Component({
  selector: 'app-admin-course-videos',
  templateUrl: './admin-course-videos.component.html',
  styleUrls: ['./admin-course-videos.component.css']
})
export class AdminCourseVideosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // Actualiza la barra latera y el footer
    AdminLTE.init();
  }

}
