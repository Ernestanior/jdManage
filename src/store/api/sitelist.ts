/*jshint -W069 */
// tslint:disable
import { AxiosRequestConfig } from "axios";
import {ISearchParamsSite} from "../network/siteList/interface";

/**
 * @class UserAPI
 * @description 用户管理API
 * @return 返回request的config
 */
class SiteListAPI {
  /**
   * createUser
   * 生成请求参数
   */
  // CreateUser = (params: {}, data: ICreateUserParams) => {
  //   const config: AxiosRequestConfig = {
  //     url: "/api/admin/user/create",
  //     method: "put",
  //     params,
  //     data,
  //   };
  //   config.headers = {};
  //   return config;
  // };

  /**
   * delete
   * 生成请求参数
   */
  // Delete = (params: IDeleteParams, data: {}) => {
  //   const config: AxiosRequestConfig = {
  //     url: "/api/admin/user/delete",
  //     method: "delete",
  //     params,
  //     data,
  //   };
  //   config.headers = {};
  //   return config;
  // };

  /**
   * findUser
   * 生成请求参数
   */
  FindSiteList = (data: ISearchParamsSite) => {
    const config: AxiosRequestConfig = {
      url: "/site/list",
      method: "post",
      data,
    };
    config.headers = {};
    return config;
  };

  /**
   * modifyUser
   * 生成请求参数
   */
  // ModifyUser = (params: {}, data: IModifyUserParams) => {
  //   const config: AxiosRequestConfig = {
  //     url: "/api/admin/user/modify",
  //     method: "put",
  //     params,
  //     data,
  //   };
  //   config.headers = {};
  //   return config;
  // };
}
export default SiteListAPI;

/** createUser的请求参数*/
interface ICreateUserParams {
  email: string; //user email
  loginId: string; //same as email
  name: string; //same as email
  plainPassword: string; //user password
  type: "admin" | "normal"; //user type "admin" / "normal"
}

/** delete的请求参数*/
interface IDeleteParams {
  id: number;
}

/** findUser的请求参数*/
interface IFindUserParams {
  keyWord: string; //user name
  searchPage: ISearchPage;
}

export interface ISearchPage {
  desc?: number;
  page: number;
  pageSize: number;
  sort?: string;
  keyWord: string; //user name
  searchPage: ISearchPage;
}

export interface ISearchPage {
  desc?: number;
  page: number;
  pageSize: number;
  sort?: string;
}

/** modifyUser的请求参数*/
interface IModifyUserParams {
  // email: string, //user name after modify
  // id: number, //user ID
  // locale: string,
  // loginId: string, //same as user name
  // name: string,  //same as user name
  // plainPassword: string, //password after modify
  // timezone: string,
  // type: string
  email: string;
  id: number;
  newPwd: string;
  oldPwd: string;
}
