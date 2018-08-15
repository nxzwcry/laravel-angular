import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRechargeListComponent } from './admin-recharge-list.component';

describe('AdminRechargeListComponent', () => {
  let component: AdminRechargeListComponent;
  let fixture: ComponentFixture<AdminRechargeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRechargeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRechargeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
