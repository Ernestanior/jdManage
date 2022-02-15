import { AxiosRequestConfig } from "axios";
/**
 * @class UserAPI
 * @description 用户管理API
 * @return 返回request的config
 */
class InfoInquiryAPI {
  Site = () => {
    const config: AxiosRequestConfig = {
      url: "/site/all",
      method: "GET",
    };
    config.headers = {};
    return config;
  };
  customerList = (data: any) => {
    const config: AxiosRequestConfig = {
      url: "/customer/list",
      method: "POST",
      data,
    };
    config.headers = {};
    return config;
  };

  domainList = (data:any)=>{
    const config: AxiosRequestConfig = {
        url: "/domain/list",
        method: "POST",
        data,
      };
      config.headers = {};
      return config;
  }

}

export default InfoInquiryAPI;
