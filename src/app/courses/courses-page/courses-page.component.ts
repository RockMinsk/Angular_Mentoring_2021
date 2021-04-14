import { Component, OnInit } from '@angular/core';
import { ICourse } from './courses-page-item/courses-page-item.model';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
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

  constructor(private coursesService: CoursesService) { }

  ngOnInit(): void {
    this.courses = this.coursesService.getList();
  }

public trackByCourseId(index: number, course: ICourse): number {
  console.log(`Video cource with id=${course.id} is displayed on the page`);
  return course.id;
}

  public addCourse(): void {
    this.courses.push({...this.newCourse});
  }

  public deleteCourse(id: number): void {
    this.courses = this.courses.filter((course: ICourse) => course.id !== id);
    console.log(`Video course with id=${id} is deleted`);
  }

  public showMore(): void {
    console.log(`Click on "Show more" button`);
  }

}
