import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginPageComponent } from './auth/login-page/login-page.component';

import { CoursesPageComponent } from './courses/courses-page/courses-page.component';
import { AddCoursePageComponent } from './courses/add-course-page/add-course-page.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  {
    path: 'courses',
    data: { breadcrumb: 'Courses' },
    children: [
      {
        path: '',
        component: CoursesPageComponent,
        canActivate: [AuthGuard],
        pathMatch: 'full',
      },
      {
        path: 'add-course',
        component: AddCoursePageComponent,
        canActivate: [AuthGuard],
        data: { breadcrumb: 'New Course' },
      },
    ],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
