import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LogoComponent } from './header/logo/logo.component';
import { UserInfoComponent } from './header/user-info/user-info.component';
import { IsAuthenticatedDirective } from '../directives/is-authenticated.directive';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    UserInfoComponent,
    IsAuthenticatedDirective,
  ],
  imports: [
    CommonModule, //
    MatIconModule,
    RouterModule,
    SharedModule,
  ],
  exports: [
    HeaderComponent, //
    FooterComponent,
    IsAuthenticatedDirective,
  ],
})
export class CoreModule {}
