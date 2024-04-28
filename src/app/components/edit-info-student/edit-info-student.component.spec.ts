import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInfoStudentComponent } from './edit-info-student.component';

describe('EditInfoStudentComponent', () => {
  let component: EditInfoStudentComponent;
  let fixture: ComponentFixture<EditInfoStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInfoStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditInfoStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
