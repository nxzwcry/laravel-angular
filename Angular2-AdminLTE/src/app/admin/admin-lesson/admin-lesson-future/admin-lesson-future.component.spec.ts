import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLessonFutureComponent } from './admin-lesson-future.component';

describe('AdminLessonFutureComponent', () => {
  let component: AdminLessonFutureComponent;
  let fixture: ComponentFixture<AdminLessonFutureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLessonFutureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLessonFutureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
