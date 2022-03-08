/*jshint -W069 */
// tslint:disable
import { AxiosRequestConfig } from "axios";
import { useNewUserInfo } from "@/store/network/user";

/**
 * @class UserAPI
 * @description 用户管理API
 * @return 返回request的config
 */
class UserAPI {
  /**
   * createUser
   * 生成请求参数
   */
  CreateUser = (params: {}, data: ICreateUserParams) => {
    const config: AxiosRequestConfig = {
      url: "/api/admin/user/create",
      method: "put",
      params,
      data,
    };
    config.headers = {};
    return config;
  };

  /**
   * delete
   * 生成请求参数
   */
  Delete = (params: IDeleteParams, data: {}) => {
    const config: AxiosRequestConfig = {
      url: "/admin/user/delete",
      method: "delete",
      params,
      data,
    };
    config.headers = {};
    return config;
  };

  /**
   * findUser
   * 生成请求参数
   */
  FindUser = (params: {}, data: any) => {
    const config: AxiosRequestConfig = {
      url: "/api/admin/user/list",
      method: "post",
      params,
      data,
    };
    config.headers = {};
    // console.log(config, 'user config')
    return config;
  };

  /**
   * modifyUser
   * 生成请求参数
   */
  ModifyUser = (params: {}, data: IModifyUserParams) => {
    const config: AxiosRequestConfig = {
      url: "/api/admin/user/modify",
      method: "put",
      params,
      data,
    };
    config.headers = {};
    return config;
  };
  //UserInfo
  UserInfo = () => {
    const config: AxiosRequestConfig = {
      url: "/account/view",
      method: "get",
    };
    config.headers = {};
    return config;
  };
  //Change Language
  UserChangeLanguage = (lang: {}, data: { lang: string }) => {
    console.log(lang, data);

    const config: AxiosRequestConfig = {
      url: "/account/change-lang",
      method: "POST",
      params: { lang },
      data: { lang: data },
    };
    config.headers = {};
    return config;
  };

  //Code List
  UserAPIWorklogCodeList = () => {
    const config: AxiosRequestConfig = {
      url: "/log/code-list",
      method: "get",
    };
    config.headers = {};
    return config;
  };
  //Event List
  UserAPIWorklogEventList = (params: any, data: GeteventList) => {
    const config: AxiosRequestConfig = {
      url: "/log/event-list",
      method: "post",
      params,
      data,
    };
    config.headers = {};
    return config;
  };
  //Log Detail

  UserAPILogDetail = (eventId: any) => {
    console.log(eventId, "api eventID");

    const config: AxiosRequestConfig = {
      url: `/log/view?uid=${eventId.eventId}`,
      method: "GET",
    };
    config.headers = {};
    return config;
  };

  //Delete WorkLog
  UserDeleteWorkLog = (eventId: string[] | null) => {
    const config: AxiosRequestConfig = {
      url: `/log/delete`,
      method: "DELETE",
      data: eventId,
    };
    config.headers = {};
    return config;
  };
  //Change Password
  UserChangePassword = (password: string[] | null) => {
    const config: AxiosRequestConfig = {
      url: `/account/change-pwd`,
      method: "POST",
      data: password,
    };
    config.headers = {};
    return config;
  };
  //Account View

  UserAccountView = () => {
    const config: AxiosRequestConfig = {
      url: `/account/view`,
      method: "GET",
    };
    config.headers = {};
    return config;
  };

  //Access Log
  UserAccessLog = (data: ISearchPage) => {
    const config: AxiosRequestConfig = {
      url: `/access/list/access-log`,
      method: "POST",
      data,
    };
    config.headers = {};
    return config;
  };
  //Access WhiteList
  UserWhiteList = (data: ISearchPage) => {
    const config: AxiosRequestConfig = {
      url: `/access/list/access-whitelist`,
      method: "POST",
      data,
    };
    config.headers = {};
    return config;
  };

  UserLogin = (data: any) => {
    const config: AxiosRequestConfig = {
      url: `/user/login?`,
      method: "PUT",
      data,
    };
    config.headers = {};
    return config;
  };
}

export default UserAPI;

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

export interface ISearchPage {
  desc?: number;
  page: number;
  pageSize: number;
  sort?: string;
  keyword: string; //user name
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

export interface eventList {
  eventId: string;
  eventType: string;
  eventService: string;
  eventDate: number;
  resourceType: string;
  resourceName: string;
  initiator: string;
  platform: string;
  key?: number;
}
export interface worklogDetail {
  eventId: string;
  eventType: string;
  eventService: string;
  eventDate: number;
  resourceType: string;
  resourceName: string;
  initiator: string;
  oldData: string;
  newData: string;
  platform: string;
}

export interface GeteventList {
  includesAll?: boolean;
  eventType?: string;
  eventService?: string;
  keyword?: string;
  endDate?: string;
  startDate?: string;
  searchPage: {};
}
