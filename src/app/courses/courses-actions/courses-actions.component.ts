import { Component, Input, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/services/logger.service';
import { ICourse } from '../courses-page/courses-page-items-list/courses-page-item/courses-page-item.model';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-courses-actions',
  templateUrl: './courses-actions.component.html',
  styleUrls: ['./courses-actions.component.scss'],
})
export class CoursesActionsComponent implements OnInit {
  @Input()
  public courses: ICourse[] = [];
  public newCourse: ICourse = {
    id: 0,
    title: 'dummy',
    creationDate: 'dummy',
    duration: 0,
    topRated: false,
    description: 'dummy',
    authors: 'dummy',
  };

  public constructor(
    private coursesService: CoursesService,
    private logger: LoggerService
  ) {}

  public ngOnInit(): void {
    this.logger.getLifeCycleHookMessage(`OnInit`, `CoursesActionsComponent`);
  }

  public addCourse(newCourse: ICourse): ICourse[] {
    this.courses = this.coursesService.createItem(newCourse);
    return this.courses;
  }
}
