import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { handleError } from '../services/error-handling.service';
import { CONSTANT } from '../shared/constants';
import { ICourse } from './courses-page/courses-page-items-list/courses-page-item/courses-page-item.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  public constructor(private httpClient: HttpClient) {}

  public getList(page: number = 1): Observable<ICourse[]> {
    return this.httpClient
      .get<ICourse[]>(`${CONSTANT.baseUrl}/${CONSTANT.url.courses}`, {
        params: { sort: 'date', start: `${(page - 1) * 4}`, count: `4` },
      })
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

  public getSearchedList(data: string): Observable<ICourse[]> {
    return this.httpClient
      .get<ICourse[]>(`${CONSTANT.baseUrl}/${CONSTANT.url.courses}`, {
        params: { textFragment: `${data}` },
      })
      .pipe(catchError((error) => handleError(error)));
  }
}
