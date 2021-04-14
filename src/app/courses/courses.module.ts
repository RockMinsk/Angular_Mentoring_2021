import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { SharedModule } from '../shared/shared.module';

import { CoursesPageComponent } from './courses-page/courses-page.component';
import { CoursesPageItemComponent } from './courses-page/courses-page-item/courses-page-item.component';
import { MinutesToHoursPipe } from '../pipes/minutes-to-hours.pipe';


@NgModule({
  declarations: [
    CoursesPageComponent,
    CoursesPageItemComponent,
    MinutesToHoursPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatIconModule,
    RouterModule
  ],
  exports: [
    CoursesPageComponent
  ]
})
export class CoursesModule { }
