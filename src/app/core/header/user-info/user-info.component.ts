import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { IUser } from 'src/app/auth/user.model';
import { LoggerService } from 'src/app/services/logger.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoComponent implements OnInit {
  @Input() public userData$!: Observable<IUser>;

  @Output()
  public logoutCriteria: EventEmitter<string> = new EventEmitter<string>();

  public constructor(
    private authService: AuthService,
    private logger: LoggerService
  ) {}

  public ngOnInit(): void {
    this.getUserInfo();
    this.logger.getLifeCycleHookMessage(`OnInit`, `UserInfoComponent`);
  }

  public logout() {
    return this.authService.logout();
  }

  private getUserInfo(): void {
    this.userData$ = this.authService.getCurrentUserInfo();
  }
}
