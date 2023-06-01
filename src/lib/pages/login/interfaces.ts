export enum ILoginScreenContext {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
}

export interface ILoginScreenComponentState {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}
