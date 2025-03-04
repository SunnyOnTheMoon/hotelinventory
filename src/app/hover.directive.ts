import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[hinvHover]'
})
export class HoverDirective {
  // @Input() hinvHover: string = 'red';

  // constructor(private element: ElementRef, private renderer: Renderer2) {
  //   console.log(this.element.nativeElement);
  // }

  // ngOnInit(): void {
  //   // this.element.nativeElement.style.backgroundColor = this.color;
  //   this.renderer.setStyle(this.element.nativeElement, 'backgroundColor', this.hinvHover);
  // }

  // @HostListener('mouseenter') onMouseEnter() {
  //   this.renderer.setStyle(this.element.nativeElement, 'backgroundColor', 'yellow');
  // }

  // @HostListener('mouseleave') onMouseLeave() {
  //   this.renderer.setStyle(this.element.nativeElement, 'backgroundColor', 'orange');
  // }

}
