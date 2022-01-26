export interface ICreateSite {
  customerUid: string;
  name: string;
  remark?: string;
  siteSuppliers: any;
  sourceIps: string;
  sourceScheme: "http" | "https";
  webSocketEndbled: boolean;
}

export interface ISiteList {
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
  sort: any;
  content: any[];
}
export interface ISearchParams {
  keyword?: string;
  email?: string;
  status?: number | string | null;
  probationFlag?: number | null;
  name?: string;
  supplier?: string;
  type?: string;
  channel?: "reg" | "sales";
  searchPage: {
    desc?: number;
    page: number;
    pageSize: number;
    sort?: string;
  };
}
export interface ISearchParamsSite extends ISearchParams {
  name?: string;
  health?: string;
  customerUid?: string;
}
