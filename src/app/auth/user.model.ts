export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAuthenticated: boolean;
  token: string;
}
