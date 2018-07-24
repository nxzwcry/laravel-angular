import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCourseLessonsComponent } from './admin-course-lessons.component';

describe('AdminCourseLessonsComponent', () => {
  let component: AdminCourseLessonsComponent;
  let fixture: ComponentFixture<AdminCourseLessonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCourseLessonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCourseLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
