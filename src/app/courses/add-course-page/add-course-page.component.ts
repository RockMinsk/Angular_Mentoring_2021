import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LoggerService } from 'src/app/services/logger.service';
import { ICourse } from '../courses-page/courses-page-items-list/courses-page-item/courses-page-item.model';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-add-course-page',
  templateUrl: './add-course-page.component.html',
  styleUrls: ['./add-course-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCoursePageComponent implements OnInit {
  public newCourse: any = {
    id: 10,
    title: 'dummy',
    creationDate: 'dummy',
    duration: 0,
    topRated: false,
    description: 'dummy',
    authors: 'dummy',
  };

  public form: FormGroup;

  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private logger: LoggerService,
    private coursesService: CoursesService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      duration: ['', Validators.required],
      creationDate: ['', Validators.required],
      authors: ['', Validators.required],
    });
  }

  public ngOnInit(): void {
    this.logger.getLifeCycleHookMessage(`OnInit`, `NewCoursePageComponent`);

    this.form.get('duration')?.valueChanges.subscribe((selectedValue) => {
      this.newCourse.duration = selectedValue;
    });
  }

  public onSubmit(): void {
    if (this.form.valid) {
      try {
        this.mapEnteredData(this.form.value);
        this.newCourse.id = this.coursesService.getLatestId() + 1;
        this.addCourse();
        this.router.navigate(['../'], { relativeTo: this.route });
      } catch (err) {
        console.log(err);
      }
    }
  }

  public onCancel(): void {
    if (confirm('Do you really want to cancel creation of new course?')) {
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  public addCourse(): void {
    this.coursesService.createItem(this.newCourse);
  }

  public mapEnteredData(enteredValues: ICourse) {
    for (const [key, value] of Object.entries(enteredValues)) {
      this.newCourse[key] = value;
    }
  }
}
