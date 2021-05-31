import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ICourse } from './courses-page-items-list/courses-page-item/courses-page-item.model';
import { CoursesService } from '../courses.service';
import { LoggerService } from 'src/app/services/logger.service';
import { CONSTANT } from 'src/app/shared/constants';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesPageComponent implements OnInit, OnDestroy {
  public courses: ICourse[] = [];

  private subscription: Subscription | undefined;

  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private logger: LoggerService,
    private cdRef: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.showCourses();
    this.logger.getLifeCycleHookMessage(`OnInit`, `CoursesPageComponent`);
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  public openAddCoursePage(): void {
    this.router.navigate([CONSTANT.url.addCourse], { relativeTo: this.route });
  }

  public searchCourse(data: string): void {
    this.subscription = this.coursesService
      .getSearchedList(data)
      .subscribe((courses: ICourse[]) => {
        this.courses = courses;
        this.cdRef.markForCheck();
      });
  }

  private showCourses(): void {
    this.subscription = this.coursesService
      .getList()
      .subscribe((courses: ICourse[]) => {
        this.courses = courses;
        this.cdRef.markForCheck();
      });
  }
}
