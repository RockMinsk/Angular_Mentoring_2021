import { Injectable } from '@angular/core';
import { CONSTANT } from '../shared/constants';
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
      duration: 25,
      topRated: false,
      description: `The course provides you with understanding of how to model your own RESTFull APIs application based on Spring Boot ` +
      `2 Framework, and overviews the six REST design constraints. You'll get a lot of endpoints corresponding to different Richardson ` +
      `Maturity Models and will be able to validate and call a request via Swagger UI.`,
      authors: `Matthias Biehl`
    },
    {
      id: 2,
      title: 'Angular GMP 2019Q3: Components RU',
      creationDate: '2021-05-15',
      duration: 256,
      topRated: true,
      description: `On this training, we will take a look at custom components in Angular, what they are, how to build components in ` +
      `Angular application and pass data between them. Also, we will check components lifecycle and find out correct component’s ` +
      `lifecycle event for several common tasks you’ll face during development.`,
      authors: `Robert C. Martin`
    },
    {
      id: 3,
      title: 'Angular GMP: Working with Directives and Pipes ENG',
      creationDate: '2021-10-22',
      duration: 385,
      topRated: false,
      description: `This training is about Angular 2 directives and pipes. It covers pipes purpose, build-in pipes usage and custom ` +
      `pipes creation. Participants will know about built-in directives and how to write custom directives.`,
      authors: `Mike Amundsen`
    },
  ];

  public constructor() { }

  public getList(): ICourse[] {
    const courses: string | null = localStorage.getItem(CONSTANT.courses);
    if (courses) {
      return JSON.parse(courses);
    } else {
      return [];
    }
  }

  public saveCoursesToLocalStorage(): void {
    return localStorage.setItem(CONSTANT.courses, JSON.stringify(this.courses));
  }

  public getLatestId(): number {
    const items: ICourse[] = this.getList();
    const ids: number[] = items.map(key => key.id);
    return Math.max(...ids);
  }

  public createItem(newItem: ICourse): ICourse[] {
    const items: ICourse[] = this.getList();
    const updatedItems: ICourse[] = [...items, newItem];
    localStorage.setItem(CONSTANT.courses, JSON.stringify(updatedItems));
    return updatedItems;
  }

  public gitItemById(id: number): ICourse | undefined {
    const items: ICourse[] = this.getList();
    return items.find(item => item.id === id);
  }

  public updateItem(updatedItem: ICourse): void {
    const items: ICourse[] = this.getList();
    const itemIndex: number = items.findIndex(item => item.id === updatedItem.id);
    items[itemIndex] = updatedItem;
    return localStorage.setItem(CONSTANT.courses, JSON.stringify(items));
  }

  public removeItem(items: ICourse[], id: number): ICourse[] {
    const updatedItems: ICourse[] = items.filter((item: ICourse) => item.id !== id);
    localStorage.removeItem(CONSTANT.courses);
    localStorage.setItem(CONSTANT.courses, JSON.stringify(updatedItems));
    return updatedItems;
  }

  public searchItem(data: string): ICourse[] {
    let items: ICourse[] = this.getList();
    if (data) {
      return items = items.filter((item: ICourse) => {
        const courseTitle: string = item.title.toLowerCase();
        return courseTitle.includes(data.toLowerCase());
      });
    } else {
      return items;
    }
  }
}
