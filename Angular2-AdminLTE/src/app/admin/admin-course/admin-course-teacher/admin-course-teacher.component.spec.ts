import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCourseTeacherComponent } from './admin-course-teacher.component';

describe('AdminCourseTeacherComponent', () => {
  let component: AdminCourseTeacherComponent;
  let fixture: ComponentFixture<AdminCourseTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCourseTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCourseTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
