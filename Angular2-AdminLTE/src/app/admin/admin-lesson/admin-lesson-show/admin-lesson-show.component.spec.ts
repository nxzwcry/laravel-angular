import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLessonShowComponent } from './admin-lesson-show.component';

describe('AdminLessonShowComponent', () => {
  let component: AdminLessonShowComponent;
  let fixture: ComponentFixture<AdminLessonShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLessonShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLessonShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
