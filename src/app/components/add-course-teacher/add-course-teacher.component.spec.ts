import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseTeacherComponent } from './add-course-teacher.component';

describe('AddCourseTeacherComponent', () => {
  let component: AddCourseTeacherComponent;
  let fixture: ComponentFixture<AddCourseTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCourseTeacherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCourseTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
