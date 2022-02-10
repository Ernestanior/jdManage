export interface ISiteSupplierList {
  uid: string;
  searchPage: ISearchPage;
}
export interface ISearchPage {
  desc?: number;
  page: number;
  pageSize: number;
  sort?: string;
}
