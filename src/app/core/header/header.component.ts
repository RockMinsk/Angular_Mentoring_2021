import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoggerService } from 'src/app/services/logger.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public constructor(
    private logger: LoggerService,
    public translate: TranslateService
  ) {}

  public ngOnInit(): void {
    this.logger.getLifeCycleHookMessage(`OnInit`, `HeaderComponent`);
  }

  public switchLang(lang: string) {
    this.translate.use(lang);
  }
}
