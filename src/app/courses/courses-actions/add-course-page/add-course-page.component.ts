import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LoggerService } from 'src/app/services/logger.service';
import { ICourse } from '../../courses-page/courses-page-items-list/courses-page-item/courses-page-item.model';
import { CoursesService } from '../../courses.service';

@Component({
  selector: 'app-add-course-page',
  templateUrl: './add-course-page.component.html',
  styleUrls: ['./add-course-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCoursePageComponent implements OnInit {
  @Input()
  public newCourse: ICourse = {
    id: 10,
    title: 'dummy',
    creationDate: 'dummy',
    duration: 0,
    topRated: false,
    description: 'dummy',
    authors: 'dummy',
  };

  @Output()
  public addCourseCriteria: EventEmitter<ICourse> = new EventEmitter<ICourse>();

  public form: FormGroup;

  private formSubmitAttempt = false;

  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private logger: LoggerService,
    private courcesService: CoursesService,
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
    // TODO: delete below code line after clarification how avoid default "0" value instead of placeholder during using of 2-way binding
    this.newCourse.duration = null;
    this.logger.getLifeCycleHookMessage(`OnInit`, `NewCoursePageComponent`);
  }

  public onSubmit(): void {
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        this.newCourse.title = this.form.get('title')?.value;
        this.newCourse.description = this.form.get('description')?.value;
        this.newCourse.duration = this.form.get('duration')?.value;
        this.newCourse.creationDate = this.form.get('creationDate')?.value;
        this.newCourse.authors = this.form.get('authors')?.value;
        this.newCourse.id = this.courcesService.getLatestId() + 1;
        this.addCourse();
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
    this.addCourseCriteria.emit(this.newCourse);
  }
}
