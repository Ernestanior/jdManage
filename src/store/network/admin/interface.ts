export interface IAdminList {
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
  sort: any;
  content: any[];
}
export interface IAdminInfo {
  username: string;
  password: string;
}
export interface IAdminUpdate extends IAdminInfo {
  id: number;
}
