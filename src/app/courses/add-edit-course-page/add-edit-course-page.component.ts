import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LoggerService } from 'src/app/services/logger.service';
import { ICourse } from '../courses-page/courses-page-items-list/courses-page-item/courses-page-item.model';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-add-edit-course-page',
  templateUrl: './add-edit-course-page.component.html',
  styleUrls: ['./add-edit-course-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditCoursePageComponent implements OnInit {
  public form: FormGroup;
  public duration = 0;
  public id = 0;
  public isAddMode = false;

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
    this.id = +this.route.snapshot.params.id;
    this.isAddMode = !this.id;
    this.logger.getLifeCycleHookMessage(`OnInit`, `AddEditCoursePageComponent`);

    if (!this.isAddMode) {
      const course: ICourse | undefined = this.coursesService.getItemById(
        this.id
      );
      this.form = this.fb.group({
        title: [course?.title, Validators.required],
        description: [course?.description, Validators.required],
        duration: [course?.duration, Validators.required],
        creationDate: [course?.creationDate, Validators.required],
        authors: [course?.authors, Validators.required],
      });
    }

    this.form.get('duration')?.valueChanges.subscribe((selectedValue) => {
      this.duration = selectedValue;
    });
  }

  public onSubmit(): void {
    if (this.form.valid) {
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
    } else {
    }
  }

  public onCancel(): void {
    if (confirm('Do you really want to cancel creation of new course?')) {
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  private addCourse(course: ICourse): void {
    this.coursesService.createItem(course);
  }

  private editCourse(course: ICourse): void {
    course.id = this.id;
    this.coursesService.updateItem(course);
  }
}
