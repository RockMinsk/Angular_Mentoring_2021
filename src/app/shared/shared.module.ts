import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [BreadcrumbsComponent, PageNotFoundComponent],
  imports: [
    CommonModule, //
    MatIconModule,
    AppRoutingModule,
    BrowserModule,
  ],
  exports: [BreadcrumbsComponent, PageNotFoundComponent],
})
export class SharedModule {}
