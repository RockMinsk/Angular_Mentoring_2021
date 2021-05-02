import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderByDate'
})
export class OrderByDatePipe implements PipeTransform {

  public transform(allCourses: any[], creationDate: string): any {
    return allCourses.sort((a, b) => (a.creationDate < b.creationDate) ? 1 : -1);
    }
}
