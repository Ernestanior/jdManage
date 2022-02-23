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

  DnsCertList = (data: any)=>{
    const config: AxiosRequestConfig ={
      url:"/dns/cert/list",
      method:"POST",
      data,
    };
    config.headers = {};
    return config;
  }
}

export default DnsManageAPI;
