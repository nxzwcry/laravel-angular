import { Component, OnInit } from '@angular/core';
// Variable in assets/js/scripts.js file
declare var AdminLTE: any;

@Component({
  selector: 'app-admin-studentlist-stopped',
  templateUrl: './admin-studentlist-stopped.component.html',
  styleUrls: ['./admin-studentlist-stopped.component.css']
})
export class AdminStudentlistStoppedComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // Actualiza la barra latera y el footer
    AdminLTE.init();
  }

}
