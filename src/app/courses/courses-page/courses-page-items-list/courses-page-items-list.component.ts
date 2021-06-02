import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { LoggerService } from 'src/app/services/logger.service';
import { CoursesService } from '../../courses.service';
import { ICourse } from './courses-page-item/courses-page-item.model';

@Component({
  selector: 'app-courses-page-items-list',
  templateUrl: './courses-page-items-list.component.html',
  styleUrls: ['./courses-page-items-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesPageItemsListComponent implements OnInit, OnDestroy {
  // TODO: change <any> to <ICourse[]> after investigation how to fix issue with types in "paginate" pipe
  @Input() public courses$!: Observable<any>;

  public currentPage = 1;
  public itemsPerPage = 4;
  public totalItems = 0;

  private subscription: Subscription | undefined;

  public constructor(
    private coursesService: CoursesService,
    private cdRef: ChangeDetectorRef,
    private logger: LoggerService
  ) {}

  public ngOnInit(): void {
    this.logger.getLifeCycleHookMessage(
      `OnInit`,
      `CoursesPageItemsListComponent`
    );
    this.showCourses();
    this.getNumberOfCourses();
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  public trackByCourseId(index: number, course: ICourse): number {
    return course.id;
  }

  // TODO: investigate if it's possible to use somehow async pipe instead of subscription in this case
  public deleteCourse(id: number): void {
    if (confirm('Do you really want to delete this course?')) {
      this.subscription = this.coursesService.removeItem(id).subscribe(() => {
        console.log(`Course with id=${id} deleted`);
        this.totalItems--;
        if (this.totalItems % this.itemsPerPage === 0) {
          this.currentPage = this.currentPage - 1;
        }
        this.courses$ = this.coursesService.getSortedList(this.currentPage);
        this.cdRef.markForCheck();
      });
    }
  }

  public handlePageChange(event: number): void {
    this.currentPage = event;
    this.showCourses();
  }

  private showCourses(): void {
    this.courses$ = this.coursesService.getSortedList(this.currentPage);
  }

  private getNumberOfCourses(): void {
    this.subscription = this.coursesService
      .getTotalNumberOfItems()
      .subscribe((result) => (this.totalItems = result));
    this.cdRef.markForCheck();
  }
}
