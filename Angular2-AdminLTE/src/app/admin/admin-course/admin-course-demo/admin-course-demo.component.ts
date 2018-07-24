import { Component, OnInit } from '@angular/core';
// Variable in assets/js/scripts.js file
declare var AdminLTE: any;

@Component({
  selector: 'app-admin-course-demo',
  templateUrl: './admin-course-demo.component.html',
  styleUrls: ['./admin-course-demo.component.css']
})
export class AdminCourseDemoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // Actualiza la barra latera y el footer
    AdminLTE.init();
  }

}
