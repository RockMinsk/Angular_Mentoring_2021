import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { LoggerService } from 'src/app/services/logger.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output()
  public logoutCriteria: EventEmitter<string> = new EventEmitter<string>();

  public userName: string | void = ``;

  public constructor(private authService: AuthService, private logger: LoggerService) { }

  public ngOnInit(): void {
    this.userName = this.authService.getCurrentUserInfo();
    this.logger.getLifeCycleHookMessage(`OnInit`, `HeaderComponent`);
  }

  public logout() {
    return this.authService.logout();
  }

}
