import { AxiosRequestConfig } from "axios";
import { ISearchCustomer } from "@/store/network/customer/interface";

class CustomerAPI {
  /**
   * findDomain
   * 生成请求参数
   */
  FindCustomer = (data: ISearchCustomer) => {
    const config: AxiosRequestConfig = {
      url: "/customer/list",
      method: "post",
      data,
    };
    config.headers = {};
    return config;
  };

  CreateCustomer = (data: {}) => {
    const config: AxiosRequestConfig = {
      url: "/customer/create",
      method: "POST",
      data,
    };
    config.headers = {};
    return config;
  };

  DeleteCustomer = (data: {}) => {
    const config: AxiosRequestConfig = {
      url: "/customer/delete",
      method: "DELETE",
      data,
    };
    config.headers = {};
    return config;
  };

  ModifyCustomer = (data: {}) => {
    const config: AxiosRequestConfig = {
      url: "/customer/modify",
      method: "POST",
      data,
    };
    config.headers = {};
    return config;
  };
}
export default CustomerAPI;
