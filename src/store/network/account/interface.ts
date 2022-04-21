import { IUserType } from "@/hooks/useInfo";

export interface IAccountInfo {
  token: string;
  userType: string;
  lang: string;
}
export interface IUserInfo {
  id: number;
  level: number;
  token: string;
  username: string;
}
