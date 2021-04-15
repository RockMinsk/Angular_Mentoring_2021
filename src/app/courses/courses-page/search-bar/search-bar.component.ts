import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBarComponent implements OnChanges {

  @Input()
  public value = ``;

  @Output()
  searchCriteria: EventEmitter<string> = new EventEmitter<string>();

  constructor(private ref: ChangeDetectorRef) {
    this.ref.markForCheck();
   }

  ngOnChanges(): void {
  }

  public searchCourse() {
    this.searchCriteria.emit(this.value);
  }

}
