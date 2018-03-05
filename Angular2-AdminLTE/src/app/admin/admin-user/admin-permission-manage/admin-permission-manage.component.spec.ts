import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPermissionManageComponent } from './admin-permission-manage.component';

describe('AdminPermissionManageComponent', () => {
  let component: AdminPermissionManageComponent;
  let fixture: ComponentFixture<AdminPermissionManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPermissionManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPermissionManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
