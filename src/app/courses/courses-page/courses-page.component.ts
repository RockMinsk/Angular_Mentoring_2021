import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ICourse } from './courses-page-items-list/courses-page-item/courses-page-item.model';
import { CoursesService } from '../courses.service';
import { LoggerService } from 'src/app/services/logger.service';
import { CONSTANT } from 'src/app/shared/constants';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesPageComponent implements OnInit {

  public courses: ICourse[] = [];
  public newCourse: ICourse = {
    id: 0,
    title: 'dummy',
    creationDate: 'dummy',
    duration: 0,
    topRated: false,
    description: 'dummy',
    authors: 'dummy'
  };

  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private logger: LoggerService
    ) { }

  public ngOnInit(): void {
    this.courses = this.coursesService.getList();
    this.logger.getLifeCycleHookMessage(`OnInit`, `CoursesPageComponent`);
  }

  public openAddCoursePage(): void {
    this.router.navigate([CONSTANT.url.addCourse], { relativeTo: this.route });
  }

  public searchCourse(data: string): ICourse[] {
    return this.courses = this.coursesService.searchItem(data);
  }

}
