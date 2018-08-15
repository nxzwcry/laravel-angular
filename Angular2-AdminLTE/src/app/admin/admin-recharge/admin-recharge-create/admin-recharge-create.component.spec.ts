import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRechargeCreateComponent } from './admin-recharge-create.component';

describe('AdminRechargeCreateComponent', () => {
  let component: AdminRechargeCreateComponent;
  let fixture: ComponentFixture<AdminRechargeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRechargeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRechargeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
