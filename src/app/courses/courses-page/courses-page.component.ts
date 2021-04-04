import { Component, OnInit } from '@angular/core';
import { CoursesPageItem } from '../courses-page-item/courses-page-item.model';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent implements OnInit {
  public courses: CoursesPageItem[] = [];

  constructor(private coursesService: CoursesService) { }

  ngOnInit(): void {
    this.courses = this.coursesService.getList();
  }

}
