import { Component, Inject } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { SettingsService } from '@delon/theme';
import {DictionaryService} from "@shared/services/dictionary.service";
import {DA_SERVICE_TOKEN, TokenService} from "@delon/auth";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector   : 'layout-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  constructor(
    public settings: SettingsService,
    public msgSrv: NzMessageService,
    public dic: DictionaryService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: TokenService,
    private router: Router,
  ) { }

  logout(){
    this.tokenService.clear();
    this.msgSrv.success('logout');
    this.router.navigate([this.tokenService.login_url]);
  }
}
