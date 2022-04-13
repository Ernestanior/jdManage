export type IString = string;

export interface IMap<T, S> {
  code: T;
  name: S;
}
export interface ITempParams {
  searchPage: ISearchPage;
  filter: {};
}
export interface ISearchPage {
  pageNum: number;
  pageSize: number;
}
