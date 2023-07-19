import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appResaltado]'
})
export class ResaltadoDirective {

  @Input()
  appResaltado= '2rem';

  constructor(private elementRef:ElementRef, private renderer2:Renderer2) {
    this.renderer2.setStyle(this.elementRef.nativeElement, 'font-size', this.appResaltado)
  }

}
