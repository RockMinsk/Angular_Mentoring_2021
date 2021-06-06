import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class LoaderInterceptor {
  private requests: HttpRequest<any>[] = [];

  public constructor(private loaderService: LoaderService) {}

  public removeRequest(req: HttpRequest<any>): void {
    const index = this.requests.indexOf(req);
    if (index >= 0) {
      this.requests.splice(index, 1);
    }
    this.loaderService.isLoading.next(this.requests.length > 0);
  }

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.requests.push(req);

    console.log(`Number of requests: ${this.requests.length}`);

    this.loaderService.isLoading.next(true);
    return new Observable((observer: any) => {
      const subscription = next.handle(req).subscribe(
        (event) => {
          if (event instanceof HttpResponse) {
            this.removeRequest(req);
            observer.next(event);
          }
        },
        (err) => {
          console.log(err);
          this.removeRequest(req);
          observer.error(err);
        },
        () => {
          this.removeRequest(req);
          observer.complete();
        }
      );
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }
}
