import { Component, OnInit } from '@angular/core';
// Variable in assets/js/scripts.js file
declare var AdminLTE: any;

@Component({
  selector: 'app-admin-permission-manage',
  templateUrl: './admin-permission-manage.component.html',
  styleUrls: ['./admin-permission-manage.component.css']
})
export class AdminPermissionManageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      // Actualiza la barra latera y el footer
      AdminLTE.init();
  }

}
