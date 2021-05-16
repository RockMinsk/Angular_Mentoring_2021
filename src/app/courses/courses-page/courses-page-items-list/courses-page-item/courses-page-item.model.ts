export interface ICourse {
  id: number;
  title: string;
  creationDate: string;
  duration: number | null;
  topRated: boolean;
  description: string;
  authors: string;
}
