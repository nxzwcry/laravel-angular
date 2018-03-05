import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRoleManageComponent } from './admin-role-manage.component';

describe('AdminRoleManageComponent', () => {
  let component: AdminRoleManageComponent;
  let fixture: ComponentFixture<AdminRoleManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRoleManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRoleManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
