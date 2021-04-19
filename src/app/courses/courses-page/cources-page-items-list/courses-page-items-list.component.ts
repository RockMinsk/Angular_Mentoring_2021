import { ChangeDetectionStrategy, Component, Input, OnInit, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit,
  AfterViewChecked, OnDestroy } from '@angular/core';
import { LoggerService } from 'src/app/services/logger.service';
import { ICourse } from './courses-page-item/courses-page-item.model';

@Component({
  selector: 'app-courses-page-items-list',
  templateUrl: './courses-page-items-list.component.html',
  styleUrls: ['./courses-page-items-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CourcesPageItemsListComponent implements OnInit, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit, OnDestroy,
AfterViewChecked {

  @Input() public courses: ICourse[] = [];

  public constructor(private logger: LoggerService) { }

  public ngOnInit(): void {
    this.logger.getLifeCycleHookMessage(`OnInit`, `CourcesPageItemsListComponent`);
  }

  public ngOnChanges(): void {
    this.logger.getLifeCycleHookMessage(`OnChanges`, `CourcesPageItemsListComponent`);
  }

  public ngAfterContentInit(): void {
    this.logger.getLifeCycleHookMessage(`AfterContentInit`, `CourcesPageItemsListComponent`);
  }

  public ngAfterContentChecked(): void {
    this.logger.getLifeCycleHookMessage(`AfterContentChecked`, `CourcesPageItemsListComponent`);
  }

  public ngAfterViewInit(): void {
    this.logger.getLifeCycleHookMessage(`AfterViewInit`, `CourcesPageItemsListComponent`);
  }

  public ngAfterViewChecked(): void {
    this.logger.getLifeCycleHookMessage(`AfterViewChecked`, `CourcesPageItemsListComponent`);
  }

  public ngOnDestroy(): void {
    this.logger.getLifeCycleHookMessage(`OnDestroy`, `CourcesPageItemsListComponent`);
  }

  public trackByCourseId(index: number, course: ICourse): number {
    return course.id;
  }

  public deleteCourse(id: number): void {
    this.courses = this.courses.filter((course: ICourse) => course.id !== id);
    console.log(`Video course with id=${id} is deleted`);
  }

  public showMore(): void {
    console.log(`Click on "Show more" button`);
  }

}
