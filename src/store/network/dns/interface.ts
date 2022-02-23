export interface IDomainList {
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
  sort: any;
  content: any[];
}
export interface ISearchDomain {
  keyWord?: string;
  customerUid?: string;
  status?: string;
  searchPage: ISearchPage;
  siteUid?: string;
  sslEnable?: number;
}

export interface ISearchPage {
  desc?: number;
  page: number;
  pageSize: number;
  sort?: string;
}

export interface IDnsDomain {
  searchPage: ISearchPage;
  uid: string;
}
export interface IDnsRecord {
  searchPage: ISearchPage;
  domainUid: string;
}
export interface ISearchDnsCname {
  domains: string[];
  siteUid: string;
}
export interface IDnsCname {
  name: string;
  record: string;
  value: string;
  validate?: string;
}
export interface IRecord {
  domain: string;
  line: any;
  name: string;
  ttl: number;
  type: string;
  value: string;
  weight: number;
}
export interface IBatchRecords {
  disableRecordsWithSameName: boolean;
  records: IRecord[];
  typesToDisable: string[];
}
export interface IDomainLine {
  uid: string;
  type: string;
  name: string;
  children?: IDomainLine[];
}
export interface IBatchRecordsResult {
  domain: string;
  name: string;
  value: string;
  success: boolean;
  errMsg?: string;
  warnMsg?: string;
}
export interface IValidateCName {
  siteUid: string;
  displayNames: string[];
}
export interface IValidateCNameResult {
  [name: string]: boolean;
}
