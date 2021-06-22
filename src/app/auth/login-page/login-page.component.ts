import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { LoggerService } from 'src/app/services/logger.service';
import { AuthActionTypes } from 'src/app/store/actions/auth.actions';
import { AppState } from 'src/app/store/app.states';
import { AuthService } from '../auth.service';
import { IUser } from '../user.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  @Input()
  public email = ``;

  @Input()
  public password = ``;

  public currentUser: IUser = {
    id: 0,
    name: {
      first: ``,
      last: ``,
    },
    login: ``,
    password: ``,
    token: ``,
  };

  public users = [];

  public form: FormGroup;
  public submitted = false;
  public loginControl = new FormControl('');
  public passwordControl = new FormControl('');

  private returnUrl: string;
  private isLoginValid = false;
  private subscription: Subscription | undefined;

  public constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private logger: LoggerService,
    private store: Store<AppState>
  ) {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/courses';

    this.form = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public async ngOnInit(): Promise<void> {
    this.logger.getLifeCycleHookMessage(`OnInit`, `LoginPageComponent`);

    if (this.authService.isAuthenticated()) {
      await this.router.navigate([this.returnUrl]);
      console.log(
        `User ${this.authService.getCurrentUserInfo()} already logged in`
      );
    }
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  public get f() {
    return this.form.controls;
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    try {
      this.login(this.form.value);
      if (!this.isLoginValid) {
        this.form.controls.password.setErrors({ incorrect: true });
      }
    } catch (err) {
      this.form.controls.password.setErrors({ incorrect: true });
      console.log(err);
    }
  }

  private login(user: Partial<IUser>): void {
    this.store.dispatch({
      type: AuthActionTypes.login,
      payload: user,
    });
  }
}
