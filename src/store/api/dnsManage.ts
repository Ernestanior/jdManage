import { AxiosRequestConfig } from "axios";
/**
 * @class UserAPI
 * @description 用户管理API
 * @return 返回request的config
 */
class DnsManageAPI {
  DnsCustomerList = (data: any) => {
    const config: AxiosRequestConfig = {
      url: "/dns/customer/list",
      method: "POST",
      data,
    };
    config.headers = {};
    return config;
  };

  DnsDomainList = (data: any) => {
    const config: AxiosRequestConfig = {
      url: "/dns/domain/list",
      method: "POST",
      data,
    };
    config.headers = {};
    return config;
  };

  DnsRecordList = (data: any) => {
    const config: AxiosRequestConfig = {
      url: "/dns/record/list",
      method: "POST",
      data,
    };
    config.headers = {};
    return config;
  };

  DnsCertList = (data: any) => {
    const config: AxiosRequestConfig = {
      url: "/dns/cert/list",
      method: "POST",
      data,
    };
    config.headers = {};
    return config;
  };

  CreateDomain = (data: any) => {
    const config: AxiosRequestConfig = {
      url: "/dns/domain/create",
      method: "POST",
      data,
    };
    config.headers = {};
    return config;
  };

  Disable = (data: any) => {
    const config: AxiosRequestConfig = {
      url: "/dns/domain/disable",
      method: "PUT",
      data,
    };
    config.headers = {};
    return config;
  };

  Enable = (data: any) => {
    const config: AxiosRequestConfig = {
      url: "/dns/domain/enable",
      method: "PUT",
      data,
    };
    config.headers = {};
    return config;
  };

  CertRequest = (data: any) => {
    const config: AxiosRequestConfig = {
      url: "/dns/cert/certgen/request",
      method: "POST",
      data,
    };
    config.headers = {};
    return config;
  };

  CloneDomain = (data: { names: []; uid: string }) => {
    const config: AxiosRequestConfig = {
      url: "/dns/domain/clone",
      method: "POST",
      data,
    };
    config.headers = {};
    return config;
  };

  DomainDelete = (data: string[]) => {
    const config: AxiosRequestConfig = {
      url: "/dns/domain/delete",
      method: "DELETE",
      data,
    };
    config.headers = {};
    return config;
  };

  CertDelete = (data: string[]) => {
    const config: AxiosRequestConfig = {
      url: "/dns/cert/delete",
      method: "DELETE",
      data,
    };
    config.headers = {};
    return config;
  };
}

export default DnsManageAPI;
