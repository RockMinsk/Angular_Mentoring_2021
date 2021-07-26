import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthGuard } from '../auth/auth.guard';
import { AddEditCoursePageComponent } from './add-edit-course-page/add-edit-course-page.component';
import { CoursesPageComponent } from './courses-page/courses-page.component';

const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'SHARED.BREADCRUMBS.COURSES' },
    children: [
      {
        path: '',
        component: CoursesPageComponent,
        canActivate: [AuthGuard],
        pathMatch: 'full',
      },
      {
        path: 'new',
        component: AddEditCoursePageComponent,
        canActivate: [AuthGuard],
        data: { breadcrumb: 'SHARED.BREADCRUMBS.NEW_COURSE' },
      },
      {
        path: ':id',
        component: AddEditCoursePageComponent,
        canActivate: [AuthGuard],
        data: { breadcrumb: 'SHARED.BREADCRUMBS.EDIT_COURSE' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, TranslateModule],
})
export class CoursesRoutingModule {}
