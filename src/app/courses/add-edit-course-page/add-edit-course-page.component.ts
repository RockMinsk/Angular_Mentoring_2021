import { DatePipe } from '@angular/common';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoggerService } from 'src/app/services/logger.service';
import { ICourse } from '../courses-page/courses-page-items-list/courses-page-item/courses-page-item.model';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-add-edit-course-page',
  templateUrl: './add-edit-course-page.component.html',
  styleUrls: ['./add-edit-course-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditCoursePageComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public duration = 0;
  public id = 0;
  public isAddMode = false;
  public submitted = false;

  private subscription: Subscription | undefined;
  private datePipe: DatePipe = new DatePipe('en-US');

  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private logger: LoggerService,
    private coursesService: CoursesService,
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      duration: ['', Validators.required],
      date: ['', Validators.required],
      authors: ['', Validators.required],
    });
  }

  public ngOnInit(): void {
    this.id = +this.route.snapshot.params.id;
    this.isAddMode = !this.id;
    this.logger.getLifeCycleHookMessage(`OnInit`, `AddEditCoursePageComponent`);

    if (!this.isAddMode) {
      let course: ICourse;
      this.subscription = this.coursesService
        .getItemById(this.id)
        .subscribe((courseSubs: ICourse) => {
          course = courseSubs;
          this.cdRef.markForCheck();

          const formattedDate = this.datePipe.transform(
            course.date,
            'yyyy-MM-dd'
          );

          let formattedAuthors: string;
          if (typeof course.authors === 'object') {
            formattedAuthors = course.authors
              .map((el: any) => `${el.name} ${el.lastName}`)
              .join(', ');
          } else {
            formattedAuthors = course.authors;
          }

          this.form = this.fb.group({
            name: [course?.name, Validators.required],
            description: [course?.description, Validators.required],
            duration: [course?.duration, Validators.required],
            date: [formattedDate, Validators.required],
            authors: [formattedAuthors, Validators.required],
          });
        });
    }

    this.form.get('duration')?.valueChanges.subscribe((selectedValue) => {
      this.duration = selectedValue;
    });
  }

  public ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  public get f() {
    return this.form.controls;
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    try {
      if (this.isAddMode) {
        this.addCourse(this.form.value);
      } else {
        this.editCourse(this.form.value);
      }
      this.router.navigate(['../'], { relativeTo: this.route });
    } catch (err) {
      console.log(err);
    }
  }

  public onCancel(): void {
    if (confirm('Do you really want to cancel creation of new course?')) {
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  private addCourse(course: ICourse): void {
    this.subscription = this.coursesService
      .createItem(course)
      .subscribe((data) => {
        console.log(data);
        this.cdRef.markForCheck();
      });
  }

  private editCourse(course: ICourse): void {
    course.id = this.id;
    this.subscription = this.coursesService
      .updateItem(course)
      .subscribe((data) => {
        console.log(data);
        this.cdRef.markForCheck();
      });
  }
}
