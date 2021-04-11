import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { CoursesPageComponent } from './courses-page/courses-page.component';
import { CoursesPageItemComponent } from './courses-page-item/courses-page-item.component';


@NgModule({
  declarations: [
    CoursesPageComponent,
    CoursesPageItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    CoursesPageComponent
  ]
})
export class CoursesModule { }
