import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appNext]',
})
export class NextDirective {
  private isAutoplayEnabled: boolean = false; // Flag to track autoplay status

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.checkScrollPosition(); // Check initial scroll position
  }

  @HostListener('click')
  next() {
    this.moveNext();
  }

  // Function to move to the next item
  private moveNext() {
    const slideMain = this.el.nativeElement.closest('.slide-wrap').querySelector('.slide-main');

    if (slideMain) {
      const items = slideMain.getElementsByClassName('item');
      if (items.length > 0) {
        const firstItem = items[0];
        const widthOfItem = firstItem.offsetWidth;
        slideMain.style.transition = 'transform 0.5s ease'; // Adjust the duration as needed
        slideMain.style.transform = `translateX(-${widthOfItem}px)`;
        setTimeout(() => {
          this.renderer.appendChild(slideMain, firstItem);
          slideMain.style.transition = '';
          slideMain.style.transform = '';
        }, 500); // Adjust the delay to match the transition duration
      }
    } else {
      console.error('Slide main container not found!');
    }
  }

  // Function to check scroll position and trigger next() if the button is in view
  private checkScrollPosition() {
    window.addEventListener('scroll', () => {
      const nextButtonOffsetTop = this.el.nativeElement.offsetTop;
      const scrollPosition = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

      // Check if the scroll position is close to the next button
      if (scrollPosition + windowHeight >= nextButtonOffsetTop) {
        // Enable autoplay if not already enabled
        if (!this.isAutoplayEnabled) {
          this.isAutoplayEnabled = true;
          this.autoplayNext();
        }
      } else {
        // Disable autoplay if not in view
        this.isAutoplayEnabled = false;
      }
    });
  }

  // Function to autoplay next continuously
  private autoplayNext() {
    if (this.isAutoplayEnabled) {
      this.moveNext();
      setTimeout(() => {
        this.autoplayNext(); // Recursive call for continuous autoplay
      }, 5000); // Adjust the autoplay interval as needed
    }
  }
}



