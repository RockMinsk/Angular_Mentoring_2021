import { Component, Input, OnInit } from '@angular/core';
import { CoursesPageItem } from './courses-page-item.model';

@Component({
  selector: 'app-courses-page-item',
  templateUrl: './courses-page-item.component.html',
  styleUrls: ['./courses-page-item.component.scss']
})
export class CoursesPageItemComponent implements OnInit {

  // Property '…' has no initializer and is not definitely assigned in the constructor error appeared without initialization
  @Input()
  public course: CoursesPageItem = {
    id: 0,
    title: 'dummy',
    creationDate: 'dummy',
    duration: 0,
    description: 'dummy'
  };

  constructor() {
   }

  ngOnInit(): void {
  }

}
