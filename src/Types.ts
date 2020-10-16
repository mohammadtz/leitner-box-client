export interface IUser {
  email: string;
  user_name: string;
  _id: string;
}

export interface IUserData {
  token: string;
  user: IUser;
}
