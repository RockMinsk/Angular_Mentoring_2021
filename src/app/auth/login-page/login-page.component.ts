import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/courses/courses.service';
import { LoggerService } from 'src/app/services/logger.service';
import { AuthService } from '../auth.service';
import { IUser } from '../user.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  @Input()
  public username = ``;

  @Input()
  public password = ``;

  public currentUser: IUser = {
    id: 0,
    firstName: ``,
    lastName: ``,
    email: ``,
    password: ``,
    isAutenticated: false,
    token: ``
  };

  public users = [];

  public form: FormGroup;
  public loginInvalid = false;
  public emailControl = new FormControl('');
  public passwordControl = new FormControl('');
  private formSubmitAttempt = false;
  private returnUrl: string;

  public constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private coursesService: CoursesService,
    private logger: LoggerService
  ) {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/courses';

    this.form = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    });
   }

  public async ngOnInit(): Promise<void> {
    this.coursesService.saveCoursesToLocalStorage();
    this.logger.getLifeCycleHookMessage(`OnInit`, `LoginPageComponent`);

    if (this.authService.isAutenticated()) {
      await this.router.navigate([this.returnUrl]);
      console.log(`User ${this.authService.getCurrentUserInfo()} already logged in`);
    }
  }

  public onSubmit(): void {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        const username = this.form.get('username')?.value;
        const password = this.form.get('password')?.value;
        this.authService.login(username, password);
      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }

}
