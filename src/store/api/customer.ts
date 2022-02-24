import { AxiosRequestConfig } from "axios";
import { ISearchCustomer } from "@/store/network/customer/interface";

class CustomerAPI {
  /**
   * findDomain
   * 生成请求参数
   */

 CustomerList = (params: any, data: any) => {
    const config: AxiosRequestConfig = {
      url: "/customer/list",
      method: "POST",
      params,
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

  ResetPassword = (params:{},data:{})=>{
    const config: AxiosRequestConfig = {
      url: "/customer/reset-password",
      method:"POST",
      params,
      data,
    };
    config.headers = {};
    return config;
  }

  Disable = (data:{})=>{
    const config: AxiosRequestConfig ={
      url:"/customer/disable",
      method:"PUT",
      data,
    };
    config.headers={};
    return config;

  }

  Enable = (data:{})=>{
    const config: AxiosRequestConfig ={
      url:"/customer/enable",
      method:"PUT",
      data,
    };
    config.headers={};
    return config;

  }
  
}
export default CustomerAPI;
