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
import { Store } from '@ngrx/store';
import { MAT_DATE_FORMATS } from '@angular/material/core';

import { Subscription } from 'rxjs';

import { LoggerService } from 'src/app/services/logger.service';
import { ActionTypes } from 'src/app/store/actions/courses.actions';
import { AppState } from 'src/app/store/app.states';
import {
  IAuthorCourse,
  ICourse,
} from '../courses-page/courses-page-items-list/courses-page-item/courses-page-item.model';
import { CoursesService } from '../courses.service';
import { v4 as uuidv4 } from 'uuid';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'MM/DD/YYYY',
  },
  display: {
    dateInput: 'MM/DD/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-add-edit-course-page',
  templateUrl: './add-edit-course-page.component.html',
  styleUrls: ['./add-edit-course-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
})
export class AddEditCoursePageComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public duration = 0;
  public id = 0;
  public topRated = false;
  public isAddMode = false;
  public preselectedAuthors: string[] = [];
  public selectedAuthors: IAuthorCourse[] = [];

  private subscription: Subscription | undefined;
  private datePipe: DatePipe = new DatePipe('en-US');

  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private logger: LoggerService,
    private coursesService: CoursesService,
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private store: Store<AppState>
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      duration: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      date: ['', Validators.required],
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
          this.topRated = course.topRated;
          this.cdRef.markForCheck();

          const formattedDate = this.datePipe.transform(
            course.date,
            'yyyy-MM-dd'
          );

          this.preselectedAuthors = course.authors.map(
            (el: any) => `${el.name} ${el.lastName}`
          );
          this.selectedAuthors = course.authors;

          this.form = this.fb.group({
            name: [
              course?.name,
              [Validators.required, Validators.maxLength(50)],
            ],
            description: [
              course?.description,
              [Validators.required, Validators.maxLength(500)],
            ],
            duration: [
              course?.duration,
              [Validators.required, Validators.pattern('^[0-9]*$')],
            ],
            date: [formattedDate, Validators.required],
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

  public addAuthor(author: string): void {
    if (author) {
      const currentAuthor: IAuthorCourse = {
        id: uuidv4(),
        name: author.split(' ')[0],
        lastName: author.split(' ')[1],
      };
      this.selectedAuthors.push(currentAuthor);
    } else {
      this.selectedAuthors = [];
    }
  }

  public removeAuthor(author: string): void {
    if (author) {
      this.selectedAuthors = this.selectedAuthors.filter(
        (item) => `${item.name} ${item.lastName}` !== author
      );
    } else {
      this.selectedAuthors = [];
    }
  }

  private addCourse(course: ICourse): void {
    course.authors = this.selectedAuthors;
    return this.store.dispatch({
      type: ActionTypes.addCourseRequest,
      payload: course,
    });
  }

  private editCourse(course: ICourse): void {
    course.id = this.id;
    course.topRated = this.topRated;
    course.authors = this.selectedAuthors;
    return this.store.dispatch({
      type: ActionTypes.editCourseRequest,
      payload: course,
    });
  }
}
