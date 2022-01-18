/*jshint -W069 */
// tslint:disable
import { AxiosRequestConfig } from "axios";
import {} from "./common.interface";

/**
 * @class AuthAPI
 * @description 登录退出API
 * @return 返回request的config
 */
class AuthAPI {
  /**
   * login
   * 生成请求参数
   */
  Login = (params: ILoginParams, data: {}) => {
    const config: AxiosRequestConfig = {
      // url: '/api/auth/login',
      url: "/login",
      method: "post",
      params,
      data,
    };
    config.headers = {};
    return config;
  };

  /**
   * logout
   * 生成请求参数
   */
  Logout = (params: ILogoutParams, data: {}) => {
    const config: AxiosRequestConfig = {
      url: "/api/auth/logout",
      method: "get",
      params,
      data,
    };
    config.headers = {};
    return config;
  };

  /**
   * resetPwd
   * 生成请求参数
   */
  ResetPwd = (params: IResetPwdParams, data: {}) => {
    const config: AxiosRequestConfig = {
      url: "/api/auth/reset-pwd",
      method: "put",
      params,
      data,
    };
    config.headers = {};
    return config;
  };

  /**
   * user
   * 生成请求参数
   */
  User = (params: IUserParams, data: {}) => {
    const config: AxiosRequestConfig = {
      url: "/user/info",
      method: "get",
      params,
      data,
    };
    config.headers = {};
    return config;
  };
}
export default AuthAPI;

/** login的请求参数*/
interface ILoginParams {}

/** logout的请求参数*/
interface ILogoutParams {}

/** resetPwd的请求参数*/
interface IResetPwdParams {}

/** user的请求参数*/
interface IUserParams {}
