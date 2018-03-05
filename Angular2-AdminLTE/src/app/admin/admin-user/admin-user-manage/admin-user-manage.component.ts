import { Component, OnInit } from '@angular/core';
// Variable in assets/js/scripts.js file
declare var AdminLTE: any;

@Component({
  selector: 'app-admin-user-manage',
  templateUrl: './admin-user-manage.component.html',
  styleUrls: ['./admin-user-manage.component.css']
})
export class AdminUserManageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      // Actualiza la barra latera y el footer
      AdminLTE.init();
  }

}
