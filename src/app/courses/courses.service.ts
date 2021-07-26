import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { handleError } from '../services/error-handling.service';
import { CONSTANT } from '../shared/constants';
import {
  IAuthor,
  ICourse,
} from './courses-page/courses-page-items-list/courses-page-item/courses-page-item.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  public constructor(private httpClient: HttpClient) {}

  public getSortedList(
    page: number = 1,
    pageSize: number = 4
  ): Observable<ICourse[]> {
    return this.httpClient
      .get<ICourse[]>(`${CONSTANT.baseUrl}/${CONSTANT.url.courses}`, {
        params: {
          sort: `date`,
          start: `${(page - 1) * pageSize}`,
          count: `${pageSize}`,
        },
      })
      .pipe(catchError((error) => handleError(error)));
  }

  public getTotalNumberOfItems(data?: string): Observable<number> {
    return this.httpClient
      .get<ICourse[]>(
        `${CONSTANT.baseUrl}/${CONSTANT.url.courses}`,
        data
          ? {
              params: {
                textFragment: `${data}`,
              },
            }
          : {}
      )
      .pipe(map((result) => result.length))
      .pipe(catchError((error) => handleError(error)));
  }

  public getItemById(id: number): Observable<ICourse> {
    return this.httpClient
      .get<ICourse>(`${CONSTANT.baseUrl}/${CONSTANT.url.courses}/${id}`)
      .pipe(catchError((error) => handleError(error)));
  }

  public createItem(newItem: ICourse): Observable<ArrayBuffer> {
    const body = JSON.stringify(newItem);
    return this.httpClient
      .post<ArrayBuffer>(`${CONSTANT.baseUrl}/${CONSTANT.url.courses}`, body, {
        headers: { 'content-type': 'application/json' },
      })
      .pipe(catchError((error) => handleError(error)));
  }

  public updateItem(updatedItem: ICourse): Observable<ArrayBuffer> {
    {
      const body = JSON.stringify(updatedItem);
      return this.httpClient
        .put<ArrayBuffer>(
          `${CONSTANT.baseUrl}/${CONSTANT.url.courses}/${updatedItem.id}`,
          body,
          {
            headers: { 'content-type': 'application/json' },
          }
        )
        .pipe(catchError((error) => handleError(error)));
    }
  }

  public removeItem(id: number): Observable<void> {
    return this.httpClient
      .delete<void>(`${CONSTANT.baseUrl}/${CONSTANT.url.courses}/${id}`)
      .pipe(catchError((error) => handleError(error)));
  }

  public getSearchedList(
    data: string,
    page: number = 1,
    pageSize: number = 4
  ): Observable<ICourse[]> {
    return this.httpClient
      .get<ICourse[]>(`${CONSTANT.baseUrl}/${CONSTANT.url.courses}`, {
        params: {
          textFragment: `${data}`,
          sort: `date`,
          start: `${(page - 1) * pageSize}`,
          count: `${pageSize}`,
        },
      })
      .pipe(catchError((error) => handleError(error)));
  }

  public getAuthors(): Observable<Partial<IAuthor[]>> {
    return this.httpClient
      .get<IAuthor[]>(`${CONSTANT.baseUrl}/${CONSTANT.url.authors}`)
      .pipe(map((result: any) => result.map((author: IAuthor) => author.name)))
      .pipe(catchError((error) => handleError(error)));
  }
}
