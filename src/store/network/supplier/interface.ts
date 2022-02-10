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
export interface IChangeOption {
  option: string;
  uid: string;
}
export interface ISaveManagement {
  suppliers: ISupplier[];
  uid: string;
}
interface ISupplier {
  code: string;
  isEnabled: boolean;
}
