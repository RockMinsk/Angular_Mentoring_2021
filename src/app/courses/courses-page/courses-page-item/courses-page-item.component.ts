import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ICourse } from './courses-page-item.model';

@Component({
  selector: 'app-courses-page-item',
  templateUrl: './courses-page-item.component.html',
  styleUrls: ['./courses-page-item.component.scss']
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

  constructor() {
   }

  ngOnInit(): void {
  }

  public delete(): void {
    this.deleteCourse.emit(this.course.id);
  }

}
