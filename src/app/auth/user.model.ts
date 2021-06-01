export interface IUser {
  id: number;
  token: string;
  name: IUserName;
  login: string;
  password: string;
}

export interface IUserName {
  first: string;
  last: string;
}
