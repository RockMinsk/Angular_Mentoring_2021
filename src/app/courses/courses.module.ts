import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MomentDateModule } from '@angular/material-moment-adapter';

import { NgxPaginationModule } from 'ngx-pagination';

import { CoursesPageComponent } from './courses-page/courses-page.component';
import { CoursesPageItemComponent } from './courses-page/courses-page-items-list/courses-page-item/courses-page-item.component';
import { SearchBarComponent } from './courses-page/search-bar/search-bar.component';
import { CoursesPageItemsListComponent } from './courses-page/courses-page-items-list/courses-page-items-list.component';
import { HighlightBorderDirective } from '../directives/highlight-border.directive';
import { MinutesToHoursPipe } from '../pipes/minutes-to-hours.pipe';
import { OrderByDatePipe } from '../pipes/order-by-date.pipe';
import { AddEditCoursePageComponent } from './add-edit-course-page/add-edit-course-page.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { AuthorsComponent } from './add-edit-course-page/authors/authors.component';

@NgModule({
  declarations: [
    SearchBarComponent,
    CoursesPageComponent,
    CoursesPageItemsListComponent,
    CoursesPageItemComponent,
    MinutesToHoursPipe,
    OrderByDatePipe,
    HighlightBorderDirective,
    AddEditCoursePageComponent,
    AuthorsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTooltipModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MomentDateModule,
    RouterModule,
    CoursesRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
  exports: [],
})
export class CoursesModule {}
