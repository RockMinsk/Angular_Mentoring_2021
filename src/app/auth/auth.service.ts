import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CONSTANT } from '../shared/constants';
import { IUser } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public users: IUser[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@test.com',
      password: 'changeMe1',
      isAuthenticated: false,
      token: '1234567890',
    },
    {
      id: 2,
      firstName: 'Michael',
      lastName: 'Johnson',
      email: 'michael.johnson@test.com',
      password: 'changeMe2',
      isAuthenticated: false,
      token: '1234567890',
    },
    {
      id: 3,
      firstName: 'Thomas',
      lastName: 'Williams',
      email: 'thomas.williams@test.com',
      password: 'changeMe3',
      isAuthenticated: false,
      token: '1234567890',
    },
  ];

  public constructor(private router: Router) {}

  public getAll(): IUser[] {
    return this.users;
  }

  public getCurrentAuthenticatedUser(): IUser | null {
    const currentUser: string | null = localStorage.getItem(
      CONSTANT.currentUser
    );
    if (currentUser) {
      return JSON.parse(currentUser);
    } else {
      return null;
    }
  }

  public login(email: string, password: string): boolean {
    const itemIndex: number = this.users.findIndex(
      (item) => item.email === email
    );
    if (itemIndex >= 0) {
      if (this.users[itemIndex].password === password) {
        this.users[itemIndex].isAuthenticated = true;
        localStorage.setItem(
          CONSTANT.currentUser,
          JSON.stringify(this.users[itemIndex])
        );
        this.router.navigate([CONSTANT.url.courses]);
        console.log(
          `User "${this.users[itemIndex].firstName} ${this.users[itemIndex].lastName}" logged in successfully`
        );
        return true;
      } else {
        console.log('Invalid password');
        return false;
      }
    } else {
      console.log('Invalid login');
      return false;
    }
  }

  public logout(): void {
    try {
      const currentUser: IUser | null = this.getCurrentAuthenticatedUser();
      let itemIndex = -1;
      if (currentUser) {
        itemIndex = this.getUserIndexById(currentUser.id);
        this.users[itemIndex].isAuthenticated = false;
        localStorage.removeItem(CONSTANT.currentUser);
        console.log(
          `User "${this.users[itemIndex].firstName} ${this.users[itemIndex].lastName}" logged out successfully`
        );
      }
      this.router.navigate([CONSTANT.url.login]);
    } catch (err) {
      console.log(err);
    }
  }

  public getUserIndexById(id: number): number {
    return this.users.findIndex((item) => item.id === id);
  }

  public isAuthenticated(): boolean {
    const currentUser: IUser | null = this.getCurrentAuthenticatedUser();
    return currentUser ? currentUser.isAuthenticated : false;
  }

  public getCurrentUserInfo(): string | void {
    try {
      const currentUser: IUser | null = this.getCurrentAuthenticatedUser();
      if (currentUser) {
        return `${currentUser.firstName} ${currentUser.lastName}`;
      } else {
        return console.log(`No logged user`);
      }
    } catch (err) {
      return console.log(err);
    }
  }
}
