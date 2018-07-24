import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentlistTeamComponent } from './admin-studentlist-team.component';

describe('AdminStudentlistTeamComponent', () => {
  let component: AdminStudentlistTeamComponent;
  let fixture: ComponentFixture<AdminStudentlistTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStudentlistTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStudentlistTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
