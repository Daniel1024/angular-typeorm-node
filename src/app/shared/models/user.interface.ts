export type Roles = 'subscriber' | 'admin';

export interface User {
  username: string;
  password?: string;
  id?: string;
  role?: Roles;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserResponse {
  message: string;
  token: string;
  user: User;
}
