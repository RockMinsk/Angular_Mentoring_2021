import { Component, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/services/logger.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  public constructor(private logger: LoggerService) { }

  public ngOnInit(): void {
    this.logger.getLifeCycleHookMessage(`OnInit`, `BreadcrumbsComponent`);
  }

}
