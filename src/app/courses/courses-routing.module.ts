import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { AddEditCoursePageComponent } from './add-edit-course-page/add-edit-course-page.component';
import { CoursesPageComponent } from './courses-page/courses-page.component';

const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Courses' },
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
        data: { breadcrumb: 'New Course' },
      },
      {
        path: ':id',
        component: AddEditCoursePageComponent,
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Edit Course' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
