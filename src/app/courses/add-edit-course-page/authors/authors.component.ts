import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  Input,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LoggerService } from 'src/app/services/logger.service';
import { ActionTypes } from 'src/app/store/actions/authors.actions';
import { AppState } from 'src/app/store/app.states';
import { getAllAuthors } from 'src/app/store/selectors/authors.selector';
import { IAuthor } from '../../courses-page/courses-page-items-list/courses-page-item/courses-page-item.model';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
})
export class AuthorsComponent implements OnInit, OnDestroy {
  @Input()
  public selectedAuthors: string[] = [];

  @Output()
  public addAuthorEvent: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public removeAuthorEvent: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('authorInput')
  public authorInput!: ElementRef<HTMLInputElement>;

  public authorsForm: FormGroup;
  public authors$!: Observable<any>;
  public filteredAuthors$!: Observable<any>;

  public selectable = true;
  public removable = true;
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public allAuthors: Partial<IAuthor[]> = [];

  private subscription!: Subscription;

  public constructor(
    private fb: FormBuilder,
    private logger: LoggerService,
    private store: Store<AppState>
  ) {
    this.authors$ = this.store.select(getAllAuthors);
    this.authorsForm = this.fb.group({
      authors: ['', Validators.required],
    });
  }

  public ngOnInit(): void {
    this.loadAuthors();
    this.logger.getLifeCycleHookMessage(`OnInit`, `AuthorsComponent`);

    this.authors$.subscribe((data) => {
      this.allAuthors = data;

      this.filteredAuthors$ = this.authorsForm.controls[
        // eslint-disable-next-line @typescript-eslint/dot-notation
        'authors'
      ].valueChanges.pipe(
        startWith(null),
        map((author: string | null) =>
          author
            ? this.filter(author)
            : this.allAuthors && this.allAuthors.slice()
        )
      );
    });
  }

  public ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  public get f() {
    return this.authorsForm.controls;
  }

  public add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value && !this.selectedAuthors.includes(value)) {
      this.selectedAuthors.push(value);
      this.addAuthorEvent.emit(value);
    }

    event.value = '';

    // eslint-disable-next-line @typescript-eslint/dot-notation
    this.authorsForm.controls['authors'].setValue(null);
  }

  public remove(author: string): void {
    this.selectedAuthors = this.selectedAuthors.filter(
      (item) => item !== author
    );
    this.removeAuthorEvent.emit(author);
  }

  public selected(event: MatAutocompleteSelectedEvent): void {
    if (!this.selectedAuthors.includes(event.option.viewValue)) {
      this.selectedAuthors.push(event.option.viewValue);
      this.addAuthorEvent.emit(event.option.viewValue);
    }
    this.authorInput.nativeElement.value = '';
    // eslint-disable-next-line @typescript-eslint/dot-notation
    this.authorsForm.controls['authors'].setValue(null);
  }

  private filter(value: string): Partial<IAuthor[]> {
    const filterValue = value.toLowerCase();

    return this.allAuthors.filter(
      (author) =>
        author && author.toString().toLowerCase().includes(filterValue)
    );
  }

  private loadAuthors(): void {
    return this.store.dispatch({
      type: ActionTypes.getAuthorsRequest,
    });
  }
}
