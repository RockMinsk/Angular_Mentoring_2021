import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export const handleError = (errorResponse: HttpErrorResponse) => {
  if (errorResponse.error instanceof ErrorEvent) {
    console.log(`Client side error: ${errorResponse.error.message}`);
  } else {
    console.log(`Server side error: ${errorResponse}`);
  }
  return throwError(errorResponse);
};
