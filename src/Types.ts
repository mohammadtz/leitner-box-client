export interface IUser {
  email: string;
  user_name: string;
  _id: string;
}

export interface IUserData {
  token: string;
  user: IUser;
}

export interface ICard {
  _id:string;
  front: string;
  back: string;
  date: string;
  userId: string;
  box_number: number;
}