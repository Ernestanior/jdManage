export interface IAccountInfo {
  token: string;
  userType: string;
  lang: string;
}
export interface IUserInfo {
  uid: string;
  userName: string;
  userType: string;
  lastLoginTime: number;
  supportsSupplier: boolean;
  features: string[];
}
