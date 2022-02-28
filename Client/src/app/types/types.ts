export interface IOutle {
  query: string;
}

export interface ISortedBy {
  path: string;
  order: boolean | "asc" | "desc";
}

export interface ISideBar {
  onChange: ({ name, value }: { name: string; value: string }) => void;
}

export interface IBasketCard {
  _id: string;
  name: string;
  price: number;
  totalPrice: number;
  totalAmount?: number;
  image: string;
  amount: number;
}

export interface ILogin {
  name?: string;
  email: string;
  password: string;
}

export interface IRecoverPass {
  email: string;
}

export interface IResetPass {
  password: string;
  confirmPassword: string;
  token?: string;
}
