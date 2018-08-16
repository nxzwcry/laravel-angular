import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLessonCreateComponent } from './admin-lesson-create.component';

describe('AdminLessonCreateComponent', () => {
  let component: AdminLessonCreateComponent;
  let fixture: ComponentFixture<AdminLessonCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLessonCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLessonCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
