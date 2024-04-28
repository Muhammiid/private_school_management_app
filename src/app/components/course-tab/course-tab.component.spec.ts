import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTabComponent } from './course-tab.component';

describe('CourseTabComponent', () => {
  let component: CourseTabComponent;
  let fixture: ComponentFixture<CourseTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
