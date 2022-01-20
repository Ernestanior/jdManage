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
}

export interface ISearchPage {
  desc?: number;
  page: number;
  pageSize: number;
  sort?: string;
}
