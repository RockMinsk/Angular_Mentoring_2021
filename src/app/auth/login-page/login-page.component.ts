import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggerService } from 'src/app/services/logger.service';
import { AuthService } from '../auth.service';
import { IUser } from '../user.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  @Input()
  public email = ``;

  @Input()
  public password = ``;

  public currentUser: IUser = {
    id: 0,
    firstName: ``,
    lastName: ``,
    email: ``,
    password: ``,
    isAuthenticated: false,
    token: ``,
  };

  public users = [];

  public form: FormGroup;
  public submitted = false;
  public emailControl = new FormControl('');
  public passwordControl = new FormControl('');
  private returnUrl: string;

  public constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private logger: LoggerService
  ) {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/courses';

    this.form = this.fb.group({
      email: ['', Validators.required],
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

  public get f() {
    return this.form.controls;
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    try {
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;
      const isLoginValid: boolean = this.authService.login(email, password);
      if (!isLoginValid) {
        this.form.controls.password.setErrors({ incorrect: true });
      }
    } catch (err) {
      this.form.controls.password.setErrors({ incorrect: true });
      console.log(err);
    }
  }
}
