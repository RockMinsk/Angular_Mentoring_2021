import { Pipe, PipeTransform } from '@angular/core';
import { ICourse } from '../courses/courses-page/courses-page-items-list/courses-page-item/courses-page-item.model';

@Pipe({
  name: 'orderByDate',
})
export class OrderByDatePipe implements PipeTransform {
  public transform(allCourses: ICourse[], date: string): ICourse[] {
    return allCourses.sort((a, b) => (a.date < b.date ? 1 : -1));
  }
}
