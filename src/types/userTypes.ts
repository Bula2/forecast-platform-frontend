export interface IAuthUser {
  email: string;
  password: string;
}

export interface IRegisterUser {
  name?: string;
  email: string;
  password: string;
}

export interface IUser {
  email: string;
  first_name: string;
  token_type: string;
  user_id: 2;
  username: string;
}
