import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuComponent } from './menu/menu.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    MenuComponent,
    BreadcrumbsComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    MenuComponent,
    BreadcrumbsComponent
  ]
})
export class SharedModule { }
