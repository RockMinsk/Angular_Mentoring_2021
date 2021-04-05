import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LogoComponent } from './logo/logo.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LogoComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule { }
