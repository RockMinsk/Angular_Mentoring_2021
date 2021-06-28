import { Action } from '@ngrx/store';
import { IAuthor } from 'src/app/courses/courses-page/courses-page-items-list/courses-page-item/courses-page-item.model';

export enum ActionTypes {
  getAuthorsRequest = '[AuthorsModule] Get all authors request',
  getAuthors = '[AuthorsModule] Get all authors',
  loadAuthorsFailed = '[AuthorsModule] Load Authors Failed',
}

export class GetAuthorsRequest implements Action {
  public readonly type = ActionTypes.getAuthorsRequest;
  public constructor() {}
}

export class GetAuthors implements Action {
  public readonly type = ActionTypes.getAuthors;
  public constructor(public payload: Partial<IAuthor[]>) {}
}

export class LoadAuthorsFailed implements Action {
  public readonly type = ActionTypes.loadAuthorsFailed;
  public constructor(public error: string) {}
}

export type All = GetAuthors;
