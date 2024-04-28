import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouuselComponent } from './carouusel.component';

describe('CarouuselComponent', () => {
  let component: CarouuselComponent;
  let fixture: ComponentFixture<CarouuselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouuselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouuselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
