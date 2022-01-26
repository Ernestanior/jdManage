/*jshint -W069 */
// tslint:disable
import { AxiosRequestConfig } from "axios";
import { ISearchParamsSite, ICreateSite } from "../network/site/interface";

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
}
export default SiteAPI;
