import { Component, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/services/logger.service';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {

  public constructor(private logger: LoggerService) { }

  public ngOnInit(): void {
    this.logger.getLifeCycleHookMessage(`OnInit`, `LogoComponent`);
  }

}
