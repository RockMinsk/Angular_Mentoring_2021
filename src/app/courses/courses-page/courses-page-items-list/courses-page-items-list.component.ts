import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';

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
  @Input() public courses: ICourse[] = [];

  public date = '';
  public pageIncrement = 1;

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
    this.showMore();
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  public trackByCourseId(index: number, course: ICourse): number {
    return course.id;
  }

  public deleteCourse(id: number): void {
    if (confirm('Do you really want to delete this course?')) {
      this.subscription = this.coursesService.removeItem(id).subscribe(() => {
        console.log(`Course with id=${id} deleted`);
        this.coursesService.getList().subscribe((courses: ICourse[]) => {
          this.courses = courses;
          this.cdRef.markForCheck();
        });
      });
    }
  }

  public showMore() {
    this.subscription = this.coursesService
      .getList(this.pageIncrement)
      .subscribe((courses: ICourse[]) => {
        this.courses = courses;
        this.cdRef.markForCheck();
      });
    this.pageIncrement++;
  }
}
