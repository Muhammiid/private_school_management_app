import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcarouseledComponent } from './newcarouseled.component';

describe('NewcarouseledComponent', () => {
  let component: NewcarouseledComponent;
  let fixture: ComponentFixture<NewcarouseledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewcarouseledComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewcarouseledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
