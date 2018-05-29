import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentlistCreateComponent } from './admin-studentlist-create.component';

describe('AdminStudentlistCreateComponent', () => {
  let component: AdminStudentlistCreateComponent;
  let fixture: ComponentFixture<AdminStudentlistCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStudentlistCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStudentlistCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
