import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRechargeShowComponent } from './admin-recharge-show.component';

describe('AdminRechargeShowComponent', () => {
  let component: AdminRechargeShowComponent;
  let fixture: ComponentFixture<AdminRechargeShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRechargeShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRechargeShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
