import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ICourse } from './courses-page-items-list/courses-page-item/courses-page-item.model';
import { CoursesService } from '../courses.service';
import { LoggerService } from 'src/app/services/logger.service';

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
    description: 'dummy'
  };

  public constructor(private coursesService: CoursesService, private logger: LoggerService) { }

  public ngOnInit(): void {
    this.courses = this.coursesService.getList();
    this.logger.getLifeCycleHookMessage(`OnInit`, `CoursesPageComponent`);
  }

  public addCourse(): void {
    // this.courses.push({...this.newCourse});
    console.log(`Click on "Add course" button`);
  }

  public searchCourse(data: string): void {
    this.courses = this.coursesService.getList();
    if (data) {
      this.courses = this.courses.filter((course: ICourse) => {
        const courseTitle: string = course.title.toLowerCase();
        return courseTitle.includes(data.toLowerCase());
      });
    }
  }

}
