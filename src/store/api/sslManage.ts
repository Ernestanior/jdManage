import { AxiosRequestConfig } from "axios";
import {
  IUploadCert,
  RequestOriginalCert,
} from "../network/sslMange/interface";
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

  uploadCert = (data: IUploadCert) => {
    const config: AxiosRequestConfig = {
      url: "/ssl/customer/upload-cert",
      method: "POST",
      data,
    };
    config.headers = {};
    return config;
  };

  deleteCert = (data: string[]) => {
    const config: AxiosRequestConfig = {
      url: "ssl/delete-cert",
      method: "DELETE",
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

  viewCert = (uid: string) => {
    const config: AxiosRequestConfig = {
      url: "/ssl/view-cert",
      method: "GET",
      params: { uid },
    };
    config.headers = {};
    return config;
  };

  viewOriginCert = (uid: string) => {
    const config: AxiosRequestConfig = {
      url: "/ssl/origin-cert/view",
      method: "GET",
      params: { uid },
    };
    config.headers = {};
    return config;
  };

  requestOriginalCert = (data: RequestOriginalCert) => {
    const config: AxiosRequestConfig = {
      url: "/ssl/origin-cert/request",
      method: "POST",
      data,
    };
    config.headers = {};
    return config;
  };

  originCertOption = () => {
    const config: AxiosRequestConfig = {
      url: "/ssl/origin-cert/option/list",
      method: "GET",
    };
    config.headers = {};
    return config;
  };

  originCertDelete = (data: string[]) => {
    const config: AxiosRequestConfig = {
      url: "/ssl/origin-cert/delete",
      method: "DELETE",
      data: data,
    };
    config.headers = {};
    return config;
  };
}

export default SslManageAPI;
