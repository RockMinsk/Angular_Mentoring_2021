import { Pipe, PipeTransform } from '@angular/core';
import { ICourse } from '../courses/courses-page/courses-page-items-list/courses-page-item/courses-page-item.model';

@Pipe({
  name: 'orderByDate',
})
export class OrderByDatePipe implements PipeTransform {
  public transform(allCourses: ICourse[], creationDate: string): ICourse[] {
    return allCourses.sort((a, b) =>
      a.creationDate < b.creationDate ? 1 : -1
    );
  }
}
