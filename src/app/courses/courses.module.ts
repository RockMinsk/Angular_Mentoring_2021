import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { SharedModule } from '../shared/shared.module';

import { CoursesPageComponent } from './courses-page/courses-page.component';
import { CoursesPageItemComponent } from './courses-page/cources-page-items-list/courses-page-item/courses-page-item.component';
import { MinutesToHoursPipe } from '../pipes/minutes-to-hours.pipe';
import { SearchBarComponent } from './courses-page/search-bar/search-bar.component';
import { CourcesPageItemsListComponent } from './courses-page/cources-page-items-list/courses-page-items-list.component';


@NgModule({
  declarations: [
    SearchBarComponent,
    CoursesPageComponent,
    CourcesPageItemsListComponent,
    CoursesPageItemComponent,
    MinutesToHoursPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
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
