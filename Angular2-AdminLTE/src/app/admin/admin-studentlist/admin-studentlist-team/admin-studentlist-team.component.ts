import { Component, OnInit } from '@angular/core';
// Variable in assets/js/scripts.js file
declare var AdminLTE: any;

@Component({
  selector: 'app-admin-studentlist-team',
  templateUrl: './admin-studentlist-team.component.html',
  styleUrls: ['./admin-studentlist-team.component.css']
})
export class AdminStudentlistTeamComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // Actualiza la barra latera y el footer
    AdminLTE.init();
  }

}
