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
export interface ICustomerCreate {
  cdnEnabled: boolean;
  dataAllowance: number;
  defenceEnabled: boolean;
  defenceQuota: string;
  dnsConfig: { domainQuota: number };
  dnsEnabled: boolean;
  domainQuota: number;
  emaul: string;
  name: string;
  password: string;
  serviceDomain: string;
  supportsSupplier: boolean;
  type: string;
}
