import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { CONSTANT } from './shared/constants';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: `${CONSTANT.url.courses}`, pathMatch: 'full' },
  { path: 'login', redirectTo: `${CONSTANT.url.login}`, pathMatch: 'full' },
  { path: `${CONSTANT.url.login}`, component: LoginPageComponent },
  {
    path: `${CONSTANT.url.courses}`,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./courses/courses.module').then((m) => m.CoursesModule),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
