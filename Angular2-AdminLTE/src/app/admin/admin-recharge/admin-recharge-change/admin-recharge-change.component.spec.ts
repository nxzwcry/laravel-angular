import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRechargeChangeComponent } from './admin-recharge-change.component';

describe('AdminRechargeChangeComponent', () => {
  let component: AdminRechargeChangeComponent;
  let fixture: ComponentFixture<AdminRechargeChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRechargeChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRechargeChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
