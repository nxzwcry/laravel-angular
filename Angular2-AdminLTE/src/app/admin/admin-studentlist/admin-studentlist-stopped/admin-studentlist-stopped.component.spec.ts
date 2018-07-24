import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentlistStoppedComponent } from './admin-studentlist-stopped.component';

describe('AdminStudentlistStoppedComponent', () => {
  let component: AdminStudentlistStoppedComponent;
  let fixture: ComponentFixture<AdminStudentlistStoppedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStudentlistStoppedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStudentlistStoppedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
