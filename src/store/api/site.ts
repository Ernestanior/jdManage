/*jshint -W069 */
// tslint:disable
import { AxiosRequestConfig } from "axios";
import { ISearchParamsSite } from "../network/site/interface";

/**
 * @class UserAPI
 * @description 用户管理API
 * @return 返回request的config
 */
class SiteAPI {
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
export default SiteAPI;
