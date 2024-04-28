import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInfoCourseComponent } from './edit-info-course.component';

describe('EditInfoCourseComponent', () => {
  let component: EditInfoCourseComponent;
  let fixture: ComponentFixture<EditInfoCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInfoCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditInfoCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
