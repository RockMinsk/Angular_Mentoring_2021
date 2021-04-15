import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ICourse } from './courses-page-item.model';

@Component({
  selector: 'app-courses-page-item',
  templateUrl: './courses-page-item.component.html',
  styleUrls: ['./courses-page-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesPageItemComponent implements OnInit {

  // Property '…' has no initializer and is not definitely assigned in the constructor error appeared without initialization
  @Input()
  public course: ICourse = {
    id: 0,
    title: 'dummy',
    creationDate: 'dummy',
    duration: 0,
    description: 'dummy'
  };

  @Output()
  deleteCourse: EventEmitter<number> = new EventEmitter<number>();

  constructor(private ref: ChangeDetectorRef) {
    this.ref.markForCheck();
   }

  ngOnInit(): void {
  }

  public delete(): void {
    this.deleteCourse.emit(this.course.id);
  }

}
