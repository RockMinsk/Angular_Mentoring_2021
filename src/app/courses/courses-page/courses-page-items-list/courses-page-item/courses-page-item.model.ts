export interface ICourse {
  id: number;
  name: string;
  date: string;
  duration: number;
  topRated: boolean;
  description: string;
  authors: IAuthorCourse[];
}

export interface IAuthor {
  id: string;
  name: string;
}

export interface IAuthorCourse extends IAuthor {
  lastName: string;
}
