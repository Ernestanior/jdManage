import { IUserType } from "@/hooks/useInfo";

export interface IAccountInfo {
  token: string;
  userType: string;
  lang: string;
}
export interface IUserInfo {
  uid: string;
  userName: string;
  userType: IUserType;
  lastLoginTime: number;
  supportsSupplier: boolean;
  features: string[];
}
