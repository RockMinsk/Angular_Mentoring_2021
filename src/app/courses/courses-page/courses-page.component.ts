import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ICourse } from './courses-page-item/courses-page-item.model';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesPageComponent implements OnInit {
  public newCourse: ICourse = {
    id: 0,
    title: 'dummy',
    creationDate: 'dummy',
    duration: 0,
    description: 'dummy'
  };
  public courses: ICourse[] = [];

  constructor(private coursesService: CoursesService, private ref: ChangeDetectorRef) {
    this.ref.markForCheck();
  }

  ngOnInit(): void {
    this.courses = this.coursesService.getList();
  }

  public trackByCourseId(index: number, course: ICourse): number {
    console.log(`Video course with id=${course.id} is displayed on the page`);
    return course.id;
  }

  public addCourse(): void {
    // this.courses.push({...this.newCourse});
    console.log(`Click on "Add course" button`);
  }

  public deleteCourse(id: number): void {
    this.courses = this.courses.filter((course: ICourse) => course.id !== id);
    console.log(`Video course with id=${id} is deleted`);
  }

  public searchCourse(data: string): void {
    if (data) {
      this.courses = this.courses.filter((course: ICourse) => {
        const courseTitle: string = course.title.toLowerCase();
        return courseTitle.includes(data.toLowerCase());
      });
    } else {
      this.courses = this.coursesService.getList();
    }
  }

  public showMore(): void {
    console.log(`Click on "Show more" button`);
  }

}
