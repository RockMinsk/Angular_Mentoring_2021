import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
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
export class UserInfoComponent implements OnInit, OnDestroy {
  @Input()
  public name = {
    first: '',
    last: '',
  };

  @Output()
  public logoutCriteria: EventEmitter<string> = new EventEmitter<string>();

  private subscription: Subscription | undefined;

  public constructor(
    private authService: AuthService,
    private logger: LoggerService,
    private cdRef: ChangeDetectorRef,
    private store: Store<AppState>
  ) {}

  public ngOnInit(): void {
    this.getUserInfo();
    this.logger.getLifeCycleHookMessage(`OnInit`, `UserInfoComponent`);
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  public logout() {
    this.store.dispatch({
      type: AuthActionTypes.logout,
    });
  }

  private getUserInfo(): void {
    this.subscription = this.authService
      .getCurrentUserInfo()
      .subscribe((data: IUser) => {
        this.name.first = data.name.first;
        this.name.last = data.name.last;
        this.cdRef.markForCheck();
      });
  }
}
