import {Inject, Injectable, Injector} from '@angular/core';
import {catchError} from "rxjs/operators";
import {zip} from "rxjs/index";
import {ACLService} from "@delon/acl";
import {NzIconService} from "ng-zorro-antd";
import {MenuService, SettingsService, TitleService} from "@delon/theme";
import {DA_SERVICE_TOKEN, ITokenService} from "@delon/auth";
import {ReuseTabService} from "@delon/abc/reuse-tab";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class UserDataService {

  constructor(
    private settingService: SettingsService,
    private aclService: ACLService,
    private httpClient: HttpClient
  ) {
  }

  public reloadUserData()
  {
    this.httpClient.get('/appdata').subscribe((appData) => this.setUserData(appData),
      () => { },
      () => {
      });
  }

  public setUserData(appData: any){

    const res: any = appData;

    if (res.user)
    {
      // 用户信息：包括姓名、头像、邮箱地址
      this.settingService.setUser(res.user);
      // ACL：设置权限为全量
      //   console.log('setAcl', res.user.acl);
      this.aclService.setRole(res.user.roles);
      this.aclService.attachAbility(res.user.permissions);
    }

  }

}
