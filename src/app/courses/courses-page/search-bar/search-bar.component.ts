import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Subject, throwError } from 'rxjs';
import {
  map,
  filter,
  debounceTime,
  distinctUntilChanged,
  catchError,
} from 'rxjs/operators';
import { LoggerService } from 'src/app/services/logger.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent implements OnInit, OnDestroy {
  @Input()
  public readonly value = ``;

  @Output()
  public searchCriteria: EventEmitter<string> = new EventEmitter<string>();

  public searchSubject: Subject<any> = new Subject();
  public currentSearchInput = ``;

  public constructor(private logger: LoggerService) {
    this.searchSubscription();
  }

  public ngOnInit(): void {
    this.logger.getLifeCycleHookMessage(`OnInit`, `SearchBarComponent`);
  }

  public ngOnDestroy(): void {
    this.searchSubject.unsubscribe();
  }

  public updateSearch(searchTextValue: KeyboardEvent) {
    this.searchSubject.next(searchTextValue);
  }

  private searchSubscription() {
    this.searchSubject
      .pipe(
        map((event) => event.target.value),
        filter((value) => value.length === 0 || value.length > 2),
        debounceTime(500),
        distinctUntilChanged(),
        catchError((err) => throwError(err))
      )
      .subscribe((searchValue: string) => {
        this.searchCriteria.emit(searchValue);
      });
  }
}
