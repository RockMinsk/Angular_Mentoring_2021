import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { LoggerService } from 'src/app/services/logger.service';
import { CONSTANT } from 'src/app/shared/constants';
import { ActionTypes } from 'src/app/store/actions/courses.actions';
import { AppState } from 'src/app/store/app.states';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesPageComponent implements OnInit {
  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private logger: LoggerService,
    private store: Store<AppState>
  ) {}

  public ngOnInit(): void {
    this.logger.getLifeCycleHookMessage(`OnInit`, `CoursesPageComponent`);
  }

  public openAddCoursePage(): void {
    this.router.navigate([CONSTANT.url.addCourse], { relativeTo: this.route });
  }

  public searchCourse(data: string): void {
    this.store.dispatch({
      type: ActionTypes.loadSearchedCourses,
      payload: data,
    });
    this.store.dispatch({
      type: ActionTypes.getTotalNumberOfCoursesRequest,
      payload: data,
    });
  }
}
