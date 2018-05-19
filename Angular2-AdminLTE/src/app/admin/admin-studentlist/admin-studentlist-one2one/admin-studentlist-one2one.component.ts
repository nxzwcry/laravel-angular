import { Component, OnInit } from '@angular/core';
// Variable in assets/js/scripts.js file
declare var AdminLTE: any;

@Component({
  selector: 'app-admin-studentlist-one2one',
  templateUrl: './admin-studentlist-one2one.component.html',
  styleUrls: ['./admin-studentlist-one2one.component.css']
})
export class AdminStudentlistOne2oneComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // Actualiza la barra latera y el footer
      AdminLTE.init();
  }

}
