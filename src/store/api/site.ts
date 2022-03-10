import { AxiosRequestConfig } from "axios";

class SiteAPI {
  /**
   * CreateSite
   * 生成请求参数
   */
  CreateSite = (data: ICreateSite) => {
    const config: AxiosRequestConfig = {
      url: "/site/create",
      method: "post",
      data,
    };
    config.headers = {};
    return config;
  };

  /**
   * EditSite
   * 生成请求参数
   */
  EditSite = (data: any) => {
    const config: AxiosRequestConfig = {
      url: "/site/edit",
      method: "post",
      data,
    };
    config.headers = {};
    return config;
  };

  /**
   * DeleteSite
   * 生成请求参数
   */
  DeleteSite = (data: string[]) => {
    const config: AxiosRequestConfig = {
      url: "/site/delete",
      method: "delete",
      data,
    };
    config.headers = {};
    return config;
  };
  /**
   * EnableSite
   * 生成请求参数
   */
  EnableSite = (data: string[]) => {
    const config: AxiosRequestConfig = {
      url: "/site/enable",
      method: "put",
      data,
    };
    config.headers = {};
    return config;
  };
  /**
   * DisableSite
   * 生成请求参数
   */
  DisableSite = (data: string[]) => {
    const config: AxiosRequestConfig = {
      url: "/site/disable",
      method: "put",
      data,
    };
    config.headers = {};
    return config;
  };
  /**
   * 条件查询site
   */
  FindSite = (data: ISearchParamsSite) => {
    const config: AxiosRequestConfig = {
      url: "/site/list",
      method: "post",
      data,
    };
    config.headers = {};
    return config;
  };

  /**
   * 查询所有site
   */
  FindSiteAll = () => {
    const config: AxiosRequestConfig = {
      url: "/site/all",
      method: "get",
    };
    config.headers = {};
    return config;
  };

  /**
   * 查询所有site
   */
  GetSiteInfo = (uid: string) => {
    const config: AxiosRequestConfig = {
      url: "/site/info",
      method: "get",
      params: { uid },
    };
    config.headers = {};
    return config;
  };
  /**
   * 源点查询
   */
  SourceList = (uid: string) => {
    const config: AxiosRequestConfig = {
      url: "/site/source/list",
      method: "post",
      data: { searchPage: { page: 1, pageSize: 999 }, uid },
    };
    config.headers = {};
    return config;
  };
  /**
   * 更新源点
   */
  SourceUpdate = (data: ISiteSource) => {
    const config: AxiosRequestConfig = {
      url: "/site/source/update",
      method: "post",
      data,
    };
    config.headers = {};
    return config;
  };
  /**
   * websocket查询
   */
  WebsocketSetting = (uid: string) => {
    const config: AxiosRequestConfig = {
      url: "/site/websocket/setting",
      method: "get",
      params: { uid },
    };
    config.headers = {};
    return config;
  };
  /**
   * websocket修改
   */
  WebsocketSave = (data: IWebsocketSave) => {
    const config: AxiosRequestConfig = {
      url: "/site/websocket/save",
      method: "post",
      data,
    };
    config.headers = {};
    return config;
  };
  /**
   * 跨越功能查询
   */
  CorsSetting = (uid: string) => {
    const config: AxiosRequestConfig = {
      url: "/site/cors/setting",
      method: "get",
      params: { uid },
    };
    config.headers = {};
    return config;
  };
  /**
   * cors修改
   */
  CorsSave = (data: ICorsSave) => {
    const config: AxiosRequestConfig = {
      url: "/site/cors/save",
      method: "post",
      data,
    };
    config.headers = {};
    return config;
  };
  /**
   * 暂停监控
   */
  DisableMonitor = (data: string[]) => {
    const config: AxiosRequestConfig = {
      url: "/site/monitor/disable",
      method: "put",
      data,
    };
    config.headers = {};
    return config;
  };
  /**
   * 重启监控
   */
  EnableMonitor = (data: string[]) => {
    const config: AxiosRequestConfig = {
      url: "/site/monitor/enable",
      method: "put",
      data,
    };
    config.headers = {};
    return config;
  };
  /**
   * SSL查询
   */
  SslList = (uid: string, data: ISslList) => {
    const config: AxiosRequestConfig = {
      url: "/ssl/site/cert-list",
      method: "post",
      params: { uid },
      data,
    };
    config.headers = {};
    return config;
  };
  /**
   * 禁用https
   */
  DisableHttps = (data: string[]) => {
    const config: AxiosRequestConfig = {
      url: "/ssl/site/disable-force-https",
      method: "put",
      data,
    };
    config.headers = {};
    return config;
  };
  /**
   * 禁用https
   */
  EnableHttps = (data: string[]) => {
    const config: AxiosRequestConfig = {
      url: "/ssl/site/enable-force-https",
      method: "put",
      data,
    };
    config.headers = {};
    return config;
  };
  /**
   * ai查询
   */
  AiList = (data: IAiList) => {
    const config: AxiosRequestConfig = {
      url: "/ai/list",
      method: "post",
      data,
    };
    config.headers = {};
    return config;
  };
  /**
   * ai设置保存
   */
  AiSave = (data: IAiSettingSave) => {
    const config: AxiosRequestConfig = {
      url: "/ai/save-setting",
      method: "post",
      data,
    };
    config.headers = {};
    return config;
  };

  /**
   * ai设置保存
   */
  AiTest = (data: IAiSettingSave) => {
    const config: AxiosRequestConfig = {
      url: "/ai/test-setting",
      method: "post",
      data,
    };
    config.headers = {};
    return config;
  };

  /**
   * ai日志
   */
  AiLog = (data: IAiLog) => {
    const config: AxiosRequestConfig = {
      url: "/ai/log/list",
      method: "post",
      data,
    };
    config.headers = {};
    return config;
  };

  CNameList = (data: ICNameList) => {
    const config: AxiosRequestConfig = {
      url: "/site/cname/list",
      method: "post",
      data,
    };
    config.headers = {};
    return config;
  };
  SaveCName = (data: ISaveCName) => {
    const config: AxiosRequestConfig = {
      url: "/site/cname/save",
      method: "post",
      data,
    };
    config.headers = {};
    return config;
  };
  GetSuffix = (uid: string) => {
    const config: AxiosRequestConfig = {
      url: "/site/suffix",
      method: "get",
      params: { uid },
    };
    config.headers = {};
    return config;
  };
}
export default SiteAPI;

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
