import { Router } from '@angular/router';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { LoggerService } from 'src/app/services/logger.service';
import { CONSTANT } from 'src/app/shared/constants';
import { ICourse } from './courses-page-item.model';

@Component({
  selector: 'app-courses-page-item',
  templateUrl: './courses-page-item.component.html',
  styleUrls: ['./courses-page-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesPageItemComponent implements OnInit {
  // Property '…' has no initializer and is not definitely assigned in the constructor error appeared without initialization
  @Input()
  public course: ICourse = {
    id: 0,
    name: 'dummy',
    date: 'dummy',
    duration: 0,
    topRated: false,
    description: 'dummy',
    authors: [],
  };

  @Output()
  public deleteCourse: EventEmitter<number> = new EventEmitter<number>();

  public constructor(private router: Router, private logger: LoggerService) {}

  public ngOnInit(): void {
    this.logger.getLifeCycleHookMessage(`OnInit`, `CoursesPageItemComponent`);
  }

  public delete(): void {
    this.deleteCourse.emit(this.course.id);
  }

  public openEditCoursePage(courseId: number): void {
    this.router.navigate([CONSTANT.url.courses, courseId]);
  }
}
