export interface ICustomerList {
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
  sort: any;
  content: any[];
}
export interface ISearchCustomer {
  keyWord?: string;
  name?: string;
  probationFlag?: any;
  status?: string;
  searchPage: ISearchPage;
  type?: string;
}

export interface ISearchPage {
  desc?: number;
  page: number;
  pageSize: number;
  sort?: string;
}
export interface IDefenceQuota {
  value: number;
}
export interface IServiceDomain {
  name: string;
  uid: string;
}
