import { ICourse } from './courses-page/courses-page-items-list/courses-page-item/courses-page-item.model';
import { CoursesService } from './courses.service';

export class CoursesServiceStab extends CoursesService {

  public courses: ICourse[] = [
    {
      id: 12345,
      title: 'TEST TITLE 1',
      creationDate: '2019-10-22',
      duration: 12345,
      topRated: false,
      description: 'TEST DESCRIPTION 1',
      authors: 'TEST AUTHORS 1'
    },
    {
      id: 56789,
      title: 'TEST TITLE 2',
      creationDate: '2021-10-22',
      duration: 56789,
      topRated: true,
      description: 'TEST DESCRIPTION 2',
      authors: 'TEST AUTHORS 2'
    }
  ];

  public constructor() {
    super();
   }

  public getList(): ICourse[] {
    return this.courses;
  }
}
