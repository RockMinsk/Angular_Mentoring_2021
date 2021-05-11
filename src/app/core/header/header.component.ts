import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy, ChangeDetectorRef, DoCheck } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { LoggerService } from 'src/app/services/logger.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, DoCheck {

  @Input()
  public userName: string | void = ``;

  @Output()
  public logoutCriteria: EventEmitter<string> = new EventEmitter<string>();

  public constructor(
    private authService: AuthService,
    private logger: LoggerService,
    private ref: ChangeDetectorRef) { }

  public ngOnInit(): void {
    this.logger.getLifeCycleHookMessage(`OnInit`, `HeaderComponent`);
  }

  public ngDoCheck(): void {
    this.userName = this.authService.getCurrentUserInfo();
    this.ref.detectChanges();
    this.logger.getLifeCycleHookMessage(`DoCheck`, `HeaderComponent`);
  }

  public logout() {
    return this.authService.logout();
  }

}
