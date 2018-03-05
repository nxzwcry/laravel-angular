import { Component, OnInit } from '@angular/core';
// Variable in assets/js/scripts.js file
declare var AdminLTE: any;

@Component({
    selector: 'app-admin-user-create',
    templateUrl: './admin-user-create.component.html',
    styleUrls: ['./admin-user-create.component.css']
})
export class AdminUserCreateComponent implements OnInit {

    constructor() { }

    ngOnInit() {
        // Actualiza la barra latera y el footer
        AdminLTE.init();
    }

}
