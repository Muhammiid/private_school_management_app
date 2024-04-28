import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrevDirective } from './prev.directive';
import { ElementRef, Renderer2, RendererFactory2 } from '@angular/core';

describe('PrevDirective', () => {
  let directive: PrevDirective;
  let fixture: ComponentFixture<PrevDirective>;
  let elRefMock: any;
  let rendererMock: Renderer2;

  beforeEach(() => {
    // Mock ElementRef
    elRefMock = {
      nativeElement: document.createElement('div')
    };

    // Mock Renderer2 using RendererFactory2
    const rendererFactory = TestBed.inject(RendererFactory2);
    rendererMock = rendererFactory.createRenderer(null, null);

    TestBed.configureTestingModule({
      providers: [
        PrevDirective,
        { provide: ElementRef, useValue: elRefMock },
        { provide: Renderer2, useValue: rendererMock }
      ]
    });

    fixture = TestBed.createComponent(PrevDirective);
    directive = fixture.componentInstance;
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  // Add more tests to verify directive behavior...
});
