import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { IUser } from 'src/app/auth/user.model';
import { LoggerService } from 'src/app/services/logger.service';
import { AuthActionTypes } from 'src/app/store/actions/auth.actions';
import { AppState } from 'src/app/store/app.states';

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
    private logger: LoggerService,
    private store: Store<AppState>
  ) {}

  public ngOnInit(): void {
    this.getUserInfo();
    this.logger.getLifeCycleHookMessage(`OnInit`, `UserInfoComponent`);
  }

  public logout() {
    this.store.dispatch({
      type: AuthActionTypes.logout,
    });
  }

  private getUserInfo(): void {
    this.userData$ = this.authService.getCurrentUserInfo();
  }
}
