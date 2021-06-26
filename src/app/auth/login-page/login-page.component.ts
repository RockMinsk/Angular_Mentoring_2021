import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { LoggerService } from 'src/app/services/logger.service';
import { CONSTANT } from 'src/app/shared/constants';
import { AuthService } from '../auth.service';
import { IUser } from '../user.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public submitted = false;
  public loginControl = new FormControl('');
  public passwordControl = new FormControl('');

  private returnUrl: string;
  private subscription: Subscription | undefined;

  public constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private logger: LoggerService,
    private cdRef: ChangeDetectorRef
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

  public async onSubmit(): Promise<void> {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    try {
      this.subscription = this.login(this.form.value).subscribe((data) => {
        const token: string | undefined = data.token;
        if (token) {
          this.authService.saveDataToSessionStorage(
            CONSTANT.STORAGE.TOKEN,
            token
          );
          this.router.navigate([CONSTANT.url.courses]);
          console.log(`User logged in successfully`);
        } else {
          this.form.controls.password.setErrors({ incorrect: true });
          console.log(`User cannot login. Token is missing or invalid`);
        }
        this.cdRef.markForCheck();
      });
    } catch (err) {
      this.form.controls.password.setErrors({ incorrect: true });
      console.log(`User cannot login. Error - ${err}`);
    }
  }

  private login(user: Partial<IUser>): Observable<Partial<IUser>> {
    return this.authService.login(user);
  }
}
