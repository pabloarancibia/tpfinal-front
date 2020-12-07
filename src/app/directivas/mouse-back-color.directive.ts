import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appMouseBackColor]'
})
export class MouseBackColorDirective {

  constructor(private el: ElementRef) {

  }
  @HostListener('mouseenter') onmouseEnter() {
    this.cambiar('yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.cambiar(null);
  }

  private cambiar(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
