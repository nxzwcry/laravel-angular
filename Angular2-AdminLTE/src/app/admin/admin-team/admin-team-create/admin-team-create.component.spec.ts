import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTeamCreateComponent } from './admin-team-create.component';

describe('AdminTeamCreateComponent', () => {
  let component: AdminTeamCreateComponent;
  let fixture: ComponentFixture<AdminTeamCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTeamCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTeamCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
