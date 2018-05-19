import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentlistOne2oneComponent } from './admin-studentlist-one2one.component';

describe('AdminStudentlistOne2oneComponent', () => {
  let component: AdminStudentlistOne2oneComponent;
  let fixture: ComponentFixture<AdminStudentlistOne2oneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStudentlistOne2oneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStudentlistOne2oneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
