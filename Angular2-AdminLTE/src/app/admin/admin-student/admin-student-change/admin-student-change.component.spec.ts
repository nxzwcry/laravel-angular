import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentChangeComponent } from './admin-student-change.component';

describe('AdminStudentChangeComponent', () => {
  let component: AdminStudentChangeComponent;
  let fixture: ComponentFixture<AdminStudentChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStudentChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStudentChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
