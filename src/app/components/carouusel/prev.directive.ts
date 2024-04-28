import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appPrev]',
})
export class PrevDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click')
  previous() {
    this.movePrevious();
  }

  // Function to move to the previous item
  private movePrevious() {
    const slideMain = this.el.nativeElement.closest('.slide-wrap').querySelector('.slide-main');

    if (slideMain) {
      const items = slideMain.getElementsByClassName('item');
      if (items.length > 0) {
        const lastItem = items[items.length - 1];
        const widthOfItem = lastItem.offsetWidth;
        slideMain.style.transition = 'transform 0.5s ease'; // Adjust the duration as needed
        slideMain.style.transform = `translateX(${widthOfItem}px)`;
        setTimeout(() => {
          this.renderer.insertBefore(slideMain, lastItem, slideMain.firstChild);
          slideMain.style.transition = '';
          slideMain.style.transform = '';
        }, 500); // Adjust the delay to match the transition duration
      }
    } else {
      console.error('Slide main container not found!');
    }
  }
}
