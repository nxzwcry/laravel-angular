import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCourseDemoComponent } from './admin-course-demo.component';

describe('AdminCourseDemoComponent', () => {
  let component: AdminCourseDemoComponent;
  let fixture: ComponentFixture<AdminCourseDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCourseDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCourseDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
