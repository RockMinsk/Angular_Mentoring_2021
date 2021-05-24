import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginPageComponent } from './auth/login-page/login-page.component';

import { CoursesPageComponent } from './courses/courses-page/courses-page.component';
import { CoursesActionsComponent } from './courses/courses-actions/courses-actions.component';

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
        component: CoursesActionsComponent,
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
