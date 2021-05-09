import { Injectable } from '@angular/core';
import { ICourse } from './courses-page/courses-page-items-list/courses-page-item/courses-page-item.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  public courses: ICourse[] = [
    {
      id: 1,
      title: 'REST API Architecture',
      creationDate: '2020-11-07',
      duration: 125,
      topRated: false,
      description: `The course provides you with understanding of how to model your own RESTFull APIs application based on Spring Boot ` +
      `2 Framework, and overviews the six REST design constraints. You'll get a lot of endpoints corresponding to different Richardson ` +
      `Maturity Models and will be able to validate and call a request via Swagger UI.`
    },
    {
      id: 2,
      title: 'Angular GMP 2019Q3: Components RU',
      creationDate: '2021-05-01',
      duration: 256,
      topRated: true,
      description: `On this training, we will take a look at custom components in Angular, what they are, how to build components in ` +
      `Angular application and pass data between them. Also, we will check components lifecycle and find out correct component’s ` +
      `lifecycle event for several common tasks you’ll face during development.`
    },
    {
      id: 3,
      title: 'Angular GMP: Working with Directives and Pipes ENG',
      creationDate: '2021-10-22',
      duration: 385,
      topRated: false,
      description: `This training is about Angular 2 directives and pipes. It covers pipes purpose, build-in pipes usage and custom ` +
      `pipes creation. Participants will know about built-in directives and how to write custom directives.`
    },
  ];

  public constructor() { }

  public getList(): ICourse[] {
    return this.courses;
  }

  public createItem(items: ICourse[], newItem: ICourse): ICourse[] {
    return items.concat([newItem]);
  }

  public gitItemById(items: ICourse[], id: number): ICourse | undefined {
    return items.find(item => item.id === id);
  }

  public updateItem(items: ICourse[], updatedItem: ICourse): ICourse {
    const itemIndex: number = items.findIndex(item => item.id === updatedItem.id);
    return items[itemIndex] = updatedItem;
  }

  public removeItem(items: ICourse[], id: number): ICourse[] {
    return items.filter((item: ICourse) => item.id !== id);
  }

  public searchItem(data: string): ICourse[] {
    let items: ICourse[] = this.getList();
    if (data) {
      return items = items.filter((item: ICourse) => {
        console.log(`${item.title.toLowerCase()}`);
        const courseTitle: string = item.title.toLowerCase();
        return courseTitle.includes(data.toLowerCase());
      });
    } else {
      return items;
    }
  }
}
