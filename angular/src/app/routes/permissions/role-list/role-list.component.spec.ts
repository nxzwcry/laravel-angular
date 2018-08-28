import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PermissionsRoleListComponent } from './role-list.component';

describe('PermissionsRoleListComponent', () => {
  let component: PermissionsRoleListComponent;
  let fixture: ComponentFixture<PermissionsRoleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionsRoleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionsRoleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
