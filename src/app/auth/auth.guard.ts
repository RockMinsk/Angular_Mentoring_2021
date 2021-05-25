import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { CONSTANT } from '../shared/constants';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  public constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    try {
      const isAuthenticated: boolean = this.authService.isAuthenticated();
      if (isAuthenticated) {
        return true;
      } else {
        this.router.navigate([CONSTANT.url.login]);
        return false;
      }
    } catch {
      this.router.navigate([CONSTANT.url.login]);
      return false;
    }
  }
}
