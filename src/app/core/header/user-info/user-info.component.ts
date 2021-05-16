import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { LoggerService } from 'src/app/services/logger.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInfoComponent implements OnInit {

  @Input()
  public userName: string | void = ``;

  @Output()
  public logoutCriteria: EventEmitter<string> = new EventEmitter<string>();


  public constructor(
        private authService: AuthService,
        private logger: LoggerService,
        private ref: ChangeDetectorRef
  ) { }

  public ngOnInit(): void {
    this.userName = this.authService.getCurrentUserInfo();
    this.ref.markForCheck();
    this.logger.getLifeCycleHookMessage(`OnInit`, `UserInfoComponent`);
  }

  public logout() {
    return this.authService.logout();
  }

}
