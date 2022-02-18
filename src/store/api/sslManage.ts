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

  viewCert = (params: any) => {
    console.log(params, "uidudid");

    const config: AxiosRequestConfig = {
      url: `/ssl/view-cert?uid=${params.data}`,
      method: "GET",
    };
    config.headers = {};
    return config;
  };

  viewOriginCert = (params:any)=>{
    const config: AxiosRequestConfig={
      url:`/ssl/origin-cert/view?uid=${params.data}`,
      method:"GET",
    };
    config.headers={};
    return config;
  }

}

export default SslManageAPI;
