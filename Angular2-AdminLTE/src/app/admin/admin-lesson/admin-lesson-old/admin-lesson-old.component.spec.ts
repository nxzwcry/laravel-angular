import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLessonOldComponent } from './admin-lesson-old.component';

describe('AdminLessonOldComponent', () => {
  let component: AdminLessonOldComponent;
  let fixture: ComponentFixture<AdminLessonOldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLessonOldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLessonOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
