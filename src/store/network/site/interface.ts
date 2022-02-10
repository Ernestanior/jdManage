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
export interface ISiteSource {
  sourceScheme: string;
  sources: string[];
  uid: string;
}
export interface IWebsocketSave {
  isEnabled: boolean;
  siteUid: string;
}
export interface ICorsSave extends IWebsocketSave {}

export interface ISslList {
  sslDomains: string;
  searchPage: ISearchPage;
}
export interface ISearchPage {
  desc?: number;
  page: number;
  pageSize: number;
  sort?: string;
}
export interface IAiList {
  searchPage: ISearchPage;
  siteUid: string;
  skipCurrentSetting: boolean;
}
export interface IAiSettingSave {
  aiSettings: IAiSetting[];
  type: string;
  uid: string;
}
export interface IAiLog {
  searchPage: ISearchPage;
  uid: string;
}
export interface IAiSetting {
  adjustmentThreshold: number;
  adjustmentWindow: number;
  decisionWindow: number;
  lineId?: number;
  lineType?: string;
  mode: string;
  supplierUid?: string;
  tolerance: number;
  uid?: string;
}
export interface ICNameList {
  keyword: string;
  searchPage: ISearchPage;
  uid: string;
}
export interface ISaveCName {
  cnames: ICName[];
  uid: string;
}
export interface ICName {
  cname: string;
  name: string;
}
