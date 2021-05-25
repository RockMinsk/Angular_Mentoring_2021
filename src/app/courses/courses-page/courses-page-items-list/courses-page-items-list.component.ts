import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  OnChanges,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
} from '@angular/core';

import { LoggerService } from 'src/app/services/logger.service';
import { CoursesService } from '../../courses.service';
import { ICourse } from './courses-page-item/courses-page-item.model';

@Component({
  selector: 'app-courses-page-items-list',
  templateUrl: './courses-page-items-list.component.html',
  styleUrls: ['./courses-page-items-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesPageItemsListComponent
  implements
    OnInit,
    OnChanges,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    OnDestroy,
    AfterViewChecked
{
  @Input() public courses: ICourse[] = [];

  public creationDate = '';

  public constructor(
    private coursesService: CoursesService,
    private logger: LoggerService
  ) {}

  public ngOnInit(): void {
    this.logger.getLifeCycleHookMessage(
      `OnInit`,
      `CoursesPageItemsListComponent`
    );
  }

  public ngOnChanges(): void {
    this.logger.getLifeCycleHookMessage(
      `OnChanges`,
      `CoursesPageItemsListComponent`
    );
  }

  public ngAfterContentInit(): void {
    this.logger.getLifeCycleHookMessage(
      `AfterContentInit`,
      `CoursesPageItemsListComponent`
    );
  }

  public ngAfterContentChecked(): void {
    this.logger.getLifeCycleHookMessage(
      `AfterContentChecked`,
      `CoursesPageItemsListComponent`
    );
  }

  public ngAfterViewInit(): void {
    this.logger.getLifeCycleHookMessage(
      `AfterViewInit`,
      `CoursesPageItemsListComponent`
    );
  }

  public ngAfterViewChecked(): void {
    this.logger.getLifeCycleHookMessage(
      `AfterViewChecked`,
      `CoursesPageItemsListComponent`
    );
  }

  public ngOnDestroy(): void {
    this.logger.getLifeCycleHookMessage(
      `OnDestroy`,
      `CoursesPageItemsListComponent`
    );
  }

  public trackByCourseId(index: number, course: ICourse): number {
    return course.id;
  }

  public deleteCourse(id: number): void {
    if (confirm('Do you really want to delete this course?')) {
      this.courses = this.coursesService.removeItem(this.courses, id);
      console.log(`Video course with id=${id} is deleted`);
    }
  }

  public showMore(): void {
    console.log(`Click on "Show more" button`);
  }
}
