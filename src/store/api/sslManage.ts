import { AxiosRequestConfig } from "axios";
/**
 * @class UserAPI
 * @description 用户管理API
 * @return 返回request的config
 */
class SslManageAPI {
  customerList = (data: any) => {
    const config: AxiosRequestConfig = {
      url: "/customer/list",
      method: "POST",
      data,
    };
    config.headers = {};
    return config;
  };

  certList = (data: any) => {
    const config: AxiosRequestConfig = {
      url: "/ssl/customer/cert-list",
      method: "POST",
      data,
    };
    config.headers = {};
    return config;
  };

  originCertList = (data: any) => {
    const config: AxiosRequestConfig = {
      url: "/ssl/origin-cert/list",
      method: "POST",
      data,
    };
    config.headers = {};
    return config;
  };
}

export default SslManageAPI;
