import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInfoTeacherComponent } from './edit-info-teacher.component';

describe('EditInfoTeacherComponent', () => {
  let component: EditInfoTeacherComponent;
  let fixture: ComponentFixture<EditInfoTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInfoTeacherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditInfoTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
