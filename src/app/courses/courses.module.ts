import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { CoursesPageComponent } from './courses-page/courses-page.component';
import { CoursesPageItemComponent } from './courses-page/courses-page-items-list/courses-page-item/courses-page-item.component';
import { SearchBarComponent } from './courses-page/search-bar/search-bar.component';
import { CoursesPageItemsListComponent } from './courses-page/courses-page-items-list/courses-page-items-list.component';
import { HighlightBorderDirective } from '../directives/highlight-border.directive';
import { MinutesToHoursPipe } from '../pipes/minutes-to-hours.pipe';
import { OrderByDatePipe } from '../pipes/order-by-date.pipe';


@NgModule({
  declarations: [
    SearchBarComponent,
    CoursesPageComponent,
    CoursesPageItemsListComponent,
    CoursesPageItemComponent,
    MinutesToHoursPipe,
    OrderByDatePipe,
    HighlightBorderDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    RouterModule
  ],
  exports: [
    SearchBarComponent,
    CoursesPageComponent
  ]
})
export class CoursesModule { }
