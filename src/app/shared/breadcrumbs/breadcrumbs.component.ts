import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { LoggerService } from 'src/app/services/logger.service';
import { IBreadcrumb } from './breadcrumbs.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  public breadcrumbs: IBreadcrumb[] | undefined = [];

  public constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private logger: LoggerService
  ) {
    this.breadcrumbs = this.buildBreadcrumb(this.activatedRoute.root);
  }

  public ngOnInit(): void {
    this.logger.getLifeCycleHookMessage(`OnInit`, `BreadcrumbsComponent`);

    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.breadcrumbs = this.buildBreadcrumb(this.activatedRoute.root));
  }

  public buildBreadcrumb(route: ActivatedRoute, url: string = '', breadcrumbs: IBreadcrumb[] = []): IBreadcrumb[] {
    const currentLabel: string = route.routeConfig && route.routeConfig.data ? route.routeConfig.data.breadcrumb : '';
    const path: string | undefined = route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';

    const nextUrl = path ? `${url}/${path}` : url;

    const breadcrumb: IBreadcrumb = {
      label: currentLabel,
      url: nextUrl
    };

    const newBreadcrumbs = breadcrumb.label ? [...breadcrumbs, breadcrumb] : [...breadcrumbs];
    if (route.firstChild) {
      return this.buildBreadcrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }

    return newBreadcrumbs;
  }

}
