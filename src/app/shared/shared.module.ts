import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from '../app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoaderComponent } from './loader/loader.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [BreadcrumbsComponent, PageNotFoundComponent, LoaderComponent],
  imports: [
    CommonModule, //
    MatIconModule,
    AppRoutingModule,
    TranslateModule,
  ],
  exports: [
    BreadcrumbsComponent,
    PageNotFoundComponent,
    LoaderComponent,
    TranslateModule,
  ],
})
export class SharedModule {}
