import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { handleError } from '../services/error-handling.service';
import { CONSTANT } from '../shared/constants';
import { IUser } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public constructor(private router: Router, private httpClient: HttpClient) {}

  public login(user: Partial<IUser>): Observable<Partial<IUser>> {
    const body = JSON.stringify(user);
    return this.httpClient
      .post<Partial<IUser>>(`${CONSTANT.baseUrl}/${CONSTANT.url.login}`, body, {
        headers: { 'content-type': 'application/json' },
      })
      .pipe(catchError((error) => handleError(error)));
  }

  public signToken(token: string): void {
    return sessionStorage.setItem(CONSTANT.STORAGE.TOKEN, token);
  }

  public saveDataToSessionStorage(key: string, value: string): void {
    return sessionStorage.setItem(key, value);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(CONSTANT.STORAGE.TOKEN);
  }

  public logout(): void {
    try {
      this.getCurrentUserInfo().subscribe((data: IUser) => {
        if (data) {
          console.log(JSON.stringify(data));
          sessionStorage.removeItem(CONSTANT.STORAGE.TOKEN);
          console.log(
            `User "${data.name.first} ${data.name.last}" logged out successfully`
          );
        }
        this.router.navigate([CONSTANT.url.login]);
      });
    } catch (err) {
      console.log(err);
    }
  }

  public isAuthenticated(): boolean {
    const token: string | null = this.getToken();
    return !!token;
  }

  public getCurrentUserInfo(): Observable<IUser> {
    const body = JSON.stringify({ token: `${this.getToken()}` });
    return this.httpClient
      .post<IUser>(`${CONSTANT.baseUrl}/${CONSTANT.url.userInfo}`, body, {
        headers: { 'content-type': 'application/json' },
      })
      .pipe(catchError((error) => handleError(error)));
  }
}
