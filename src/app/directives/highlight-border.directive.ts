import { Directive, ElementRef, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[appHighlightBorder]'
})
export class HighlightBorderDirective implements OnInit {

  @Input('appHighlightBorder') public itemCreationDate = '';

  public constructor(private element: ElementRef) {}

  public ngOnInit(): void {
    this.highlight(this.itemCreationDate);
  }

  private highlight(itemCreationDate: string|null) {
    const creationDate: Date = new Date (`${itemCreationDate}`);
    const currentDate: Date = new Date();
    let currentDateMinusTwoWeeks: Date = new Date();
    currentDateMinusTwoWeeks = new Date(currentDateMinusTwoWeeks.setDate(currentDateMinusTwoWeeks.getDate() - 14));

    switch(true) {
      case creationDate < currentDate && creationDate >= currentDateMinusTwoWeeks:
        return this.element.nativeElement.style.boxShadow = '0 1px 2px 0 rgba(127,255,0,0.50), 0 2px 10px 0 rgba(127,255,0,0.50)';
      case creationDate > currentDate:
        return this.element.nativeElement.style.boxShadow = '0 1px 2px 0 rgba(0,191,255,0.50), 0 2px 10px 0 rgba(0,191,255,0.50)';
      default:
        return true;
    }
  }

}
