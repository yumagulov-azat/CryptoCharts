import { Directive, ElementRef, Input, OnChanges } from '@angular/core';


@Directive({
  selector: '[appTrendColor]'
})
export class TrendColorDirective implements OnChanges {

  @Input('appTrendColor') value: number;

  constructor(private el: ElementRef) {

  }

  ngOnChanges() {
    if (this.value && this.value > 0) {
      this.el.nativeElement.classList.remove('value-down');
      this.el.nativeElement.classList.add('value-up');
    } else if (this.value && this.value < 0) {
      this.el.nativeElement.classList.remove('value-up');
      this.el.nativeElement.classList.add('value-down');
    }
  }

}
