import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LoggerService } from 'src/app/services/logger.service';
import { ICourse } from '../courses-page/courses-page-items-list/courses-page-item/courses-page-item.model';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-add-edit-course-page',
  templateUrl: './add-edit-course-page.component.html',
  styleUrls: ['./add-edit-course-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEditCoursePageComponent implements OnInit {

  @Input()
  public course: ICourse = {
    id: 10,
    title: 'dummy',
    creationDate: 'dummy',
    duration: 0,
    topRated: false,
    description: 'dummy',
    authors: 'dummy'
  };

  public form: FormGroup;
  public id = 0;
  public isAddMode = false;

  private formSubmitAttempt = false;

  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private logger: LoggerService,
    private coursesService: CoursesService,
    private fb: FormBuilder,
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
    this.id = +this.route.snapshot.params.id;
    this.isAddMode = !this.id;
    // TODO: delete below code line after clarification how avoid default "0" value instead of placeholder during using of 2-way binding
    this.course.duration = null;
    this.logger.getLifeCycleHookMessage(`OnInit`, `NewCoursePageComponent`);

    if (!this.isAddMode) {
      const course: ICourse | undefined = this.coursesService.getItemById(this.id);
      this.form = this.fb.group({
        title: [course?.title, Validators.required],
        description: [course?.description, Validators.required],
        duration: [course?.duration, Validators.required],
        creationDate: [course?.creationDate, Validators.required],
        authors: [course?.authors, Validators.required]
      });
    }
  }

  public onSubmit(): void {
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        this.course.title = this.form.get('title')?.value;
        this.course.description = this.form.get('description')?.value;
        this.course.duration = this.form.get('duration')?.value;
        this.course.creationDate = this.form.get('creationDate')?.value;
        this.course.authors = this.form.get('authors')?.value;
        if (this.isAddMode) {
          this.addCourse();
        } else {
          this.editCourse();
        }
        this.router.navigate(['../'], { relativeTo: this.route });
      } catch (err) {
        console.log(err);
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }

  public onCancel(): void {
    if (confirm('Do you really want to cancel creation of new course?')) {
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  public addCourse(): void {
    this.course.id = this.coursesService.getLatestId() + 1;
    this.coursesService.createItem(this.course);
  }

  public editCourse(): void {
    this.course.id = this.id;
    this.coursesService.updateItem(this.course);
  }

}
