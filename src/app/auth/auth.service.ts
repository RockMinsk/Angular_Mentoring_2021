import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public users: IUser[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@test.com',
      password: 'changeme1',
      isAutenticated: false,
      token: '1234567890'
    },
    {
      id: 2,
      firstName: 'Michael',
      lastName: 'Johnson',
      email: 'michael.johnson@test.com',
      password: 'changeme2',
      isAutenticated: false,
      token: '1234567890'
    },
    {
      id: 3,
      firstName: 'Thomas',
      lastName: 'Williams',
      email: 'thomas.williams@test.com',
      password: 'changeme3',
      isAutenticated: false,
      token: '1234567890'
    },
  ];

  public constructor(private router: Router) { }

  public getAll(): IUser[] {
    return this.users;
  }

  public getCurrentAuthenticatedUser(): IUser | null {
    const currentUser: string | null = localStorage.getItem('currentUser');
    if (currentUser) {
      return JSON.parse(currentUser);
    } else {
      return null;
    }
  }

  public login(email: string, password: string): boolean | void {
    const itemIndex: number = this.users.findIndex(item => item.email === email);
    if (itemIndex >= 0) {
      if (this.users[itemIndex].password === password) {
        this.users[itemIndex].isAutenticated = true;
        localStorage.setItem('currentUser', JSON.stringify(this.users[itemIndex]));
        this.router.navigate(['/courses']);
        console.log(`User "${this.users[itemIndex].firstName} ${this.users[itemIndex].lastName}" logged in successfully`);
      } else {
        console.log('Invalid password');
      }
    } else {
      console.log('Invalid login');
    }
  }

  public logout(): void {
    try {
      const currentUser: IUser | null = this.getCurrentAuthenticatedUser();
      let itemIndex = -1;
      if (currentUser) {
        itemIndex = this.getUserIndexById(currentUser.id);
        this.users[itemIndex].isAutenticated = false;
        localStorage.removeItem('currentUser');
        console.log(`User "${this.users[itemIndex].firstName} ${this.users[itemIndex].lastName}" logged out successfully`);
      }
      this.router.navigate(['/login']);
    } catch (err) {
      console.log(err);
    }
  }

  public getUserIndexById(id: number): number {
    return this.users.findIndex(item => item.id === id);
  }

  public isAutenticated(): boolean {
    const currentUser: IUser | null = this.getCurrentAuthenticatedUser();
    return currentUser ? currentUser.isAutenticated : false;
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
