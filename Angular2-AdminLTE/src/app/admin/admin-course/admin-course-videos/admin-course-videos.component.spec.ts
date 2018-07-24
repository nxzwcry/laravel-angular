import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCourseVideosComponent } from './admin-course-videos.component';

describe('AdminCourseVideosComponent', () => {
  let component: AdminCourseVideosComponent;
  let fixture: ComponentFixture<AdminCourseVideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCourseVideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCourseVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
