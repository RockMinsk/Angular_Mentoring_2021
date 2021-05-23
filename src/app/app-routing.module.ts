import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginPageComponent } from './auth/login-page/login-page.component';

import { CoursesPageComponent } from './courses/courses-page/courses-page.component';
import { AddEditCoursePageComponent } from './courses/add-edit-course-page/add-edit-course-page.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginPageComponent},
  {path: 'courses', data: { breadcrumb: 'Courses' }, children: [
    {path: '', component: CoursesPageComponent, canActivate: [ AuthGuard ], pathMatch: 'full'},
    {path: 'new', component: AddEditCoursePageComponent, canActivate: [ AuthGuard ], data: { breadcrumb: 'New Course' }},
    {path: ':id', component: AddEditCoursePageComponent, canActivate: [ AuthGuard ], data: { breadcrumb: 'Edit Course' }}
  ]},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ AuthGuard ]
})
export class AppRoutingModule { }
