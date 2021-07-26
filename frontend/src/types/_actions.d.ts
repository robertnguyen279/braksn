export type Action = {
  type: string;
  payload?: any;
  callback?(e?: any): any;
};

export type LoginUser = {
  email: string;
  password: string;
  remember?: any;
};

export type LoginByGoogle = {
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  token: string;
};

export type LoginByFacebook = {
  name: string;
  email: string;
  avatar: string;
};

export type CreateUser = {
  password: string;
  email: string;
};
