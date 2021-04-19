import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  public id = 1;

  public constructor() { }

  public getLifeCycleHookMessage(hookName: string, className: string) {
     return console.log(`#${this.id++} ${hookName} - ${className}`);
  }
}
