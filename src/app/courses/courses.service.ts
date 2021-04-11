import { Injectable } from '@angular/core';
import { CoursesPageItem } from './courses-page-item/courses-page-item.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor() { }

  getList(): CoursesPageItem[] {
    return [
      {
        id: 1,
        title: 'REST API Architecture',
        creationDate: '2021/04/02',
        duration: 120,
        description: `The course provides you with understanding of how to model your own RESTFull APIs application based on Spring Boot ` +
        `2 Framework, and overviews the six REST design constraints. You'll get a lot of endpoints corresponding to different Richardson ` +
        `Maturity Models and will be able to validate and call a request via Swagger UI.`
      },
      {
        id: 2,
        title: 'Angular GMP 2019Q3: Components RU',
        creationDate: '2019/10/22',
        duration: 240,
        description: `On this training, we will take a look at custom components in Angular, what they are, how to build components in ` +
        `Angular application and pass data between them. Also, we will check components lifecycle and find out correct component’s ` +
        `lifecycle event for several common tasks you’ll face during development.`
      },
      {
        id: 3,
        title: 'Angular GMP: Working with Directives and Pipes ENG',
        creationDate: '2019/11/07',
        duration: 360,
        description: `This training is about Angular 2 directives and pipes. It covers pipes purpose, build-in pipes usage and custom ` +
        `pipes creation. Participants will know about built-in directives and how to write custom directives.`
      },
    ];
  }
}
