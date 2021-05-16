import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, AfterContentInit, AfterContentChecked,
  AfterViewInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { LoggerService } from 'src/app/services/logger.service';
import { ICourse } from './courses-page-item.model';

@Component({
  selector: 'app-courses-page-item',
  templateUrl: './courses-page-item.component.html',
  styleUrls: ['./courses-page-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesPageItemComponent implements OnInit, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked,
OnDestroy {

  // Property '…' has no initializer and is not definitely assigned in the constructor error appeared without initialization
  @Input()
  public course: ICourse = {
    id: 0,
    title: 'dummy',
    creationDate: 'dummy',
    duration: 0,
    topRated: false,
    description: 'dummy'
  };

  @Output()
  public deleteCourse: EventEmitter<number> = new EventEmitter<number>();

  public constructor(private logger: LoggerService) { }

  public ngOnInit(): void {
    this.logger.getLifeCycleHookMessage(`OnInit`, `CoursesPageItemComponent`);
  }

  public ngOnChanges(): void {
    this.logger.getLifeCycleHookMessage(`OnChanges`, `CoursesPageItemComponent`);
  }

  public ngAfterContentInit(): void {
    this.logger.getLifeCycleHookMessage(`AfterContentInit`, `CoursesPageItemComponent`);
  }

  public ngAfterContentChecked(): void {
    this.logger.getLifeCycleHookMessage(`AfterContentChecked`, `CoursesPageItemComponent`);
  }

  public ngAfterViewInit(): void {
    this.logger.getLifeCycleHookMessage(`AfterViewInit`, `CoursesPageItemComponent`);
  }

  public ngAfterViewChecked(): void {
    this.logger.getLifeCycleHookMessage(`AfterViewChecked`, `CoursesPageItemComponent`);
  }

  public ngOnDestroy(): void {
    this.logger.getLifeCycleHookMessage(`OnDestroy`, `CoursesPageItemComponent`);
  }

  public delete(): void {
    this.deleteCourse.emit(this.course.id);
  }

}
