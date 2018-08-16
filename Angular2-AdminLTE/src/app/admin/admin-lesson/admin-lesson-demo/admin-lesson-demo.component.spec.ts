import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLessonDemoComponent } from './admin-lesson-demo.component';

describe('AdminLessonDemoComponent', () => {
  let component: AdminLessonDemoComponent;
  let fixture: ComponentFixture<AdminLessonDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLessonDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLessonDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
