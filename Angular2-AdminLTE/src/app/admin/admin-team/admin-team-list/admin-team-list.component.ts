import { Component, OnInit } from '@angular/core';
// Variable in assets/js/scripts.js file
declare var AdminLTE: any;

@Component({
  selector: 'app-admin-team-list',
  templateUrl: './admin-team-list.component.html',
  styleUrls: ['./admin-team-list.component.css']
})
export class AdminTeamListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // Actualiza la barra latera y el footer
    AdminLTE.init();
  }

}
