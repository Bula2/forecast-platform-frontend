export interface AuthUser {
  email: string;
  password: string;
}

export interface RegisterUser {
  name?: string;
  email: string;
  password: string;
}

export interface User {
  email: string;
  first_name: string;
  token_type: string;
  user_id: number;
  username: string;
}
