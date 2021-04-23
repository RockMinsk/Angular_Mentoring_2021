import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutesToHours'
})
export class MinutesToHoursPipe implements PipeTransform {
  public transform(value: number): string {
    if (value) {
      const hours = Math.floor(value / 60);
      const minutes = Math.floor(value % 60);
      return hours + ' h ' + minutes + ' min';
    } else {
      return 'N/A';
    }
  }
}
