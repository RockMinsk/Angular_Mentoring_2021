import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesPageComponent } from './courses-page/courses-page.component';
import { CoursesPageItemComponent } from './courses-page-item/courses-page-item.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { MenuComponent } from './menu/menu.component';



@NgModule({
  declarations: [
    CoursesPageComponent,
    CoursesPageItemComponent,
    BreadcrumbsComponent,
    MenuComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CoursesPageComponent
  ]
})
export class CoursesModule { }
