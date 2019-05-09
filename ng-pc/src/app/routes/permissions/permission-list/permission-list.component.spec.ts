import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PermissionsPermissionListComponent } from './permission-list.component';

describe('PermissionsPermissionListComponent', () => {
  let component: PermissionsPermissionListComponent;
  let fixture: ComponentFixture<PermissionsPermissionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionsPermissionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionsPermissionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
