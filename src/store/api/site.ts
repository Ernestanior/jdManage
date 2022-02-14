import {
  IAiSettingSave,
  ICNameList,
  ISaveCName,
} from "./../network/site/interface";
/*jshint -W069 */
// tslint:disable
import { AxiosRequestConfig } from "axios";
import {
  ISearchParamsSite,
  ICreateSite,
  ISiteSource,
  IWebsocketSave,
  ICorsSave,
  ISslList,
  IAiList,
  IAiLog,
} from "../network/site/interface";

/**
 * @class UserAPI
 * @description 用户管理API
 * @return 返回request的config
 */
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
