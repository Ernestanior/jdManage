import { AxiosRequestConfig } from "axios";
import { ISearchCustomer } from "@/store/network/customer/interface";

class CustomerAPI {
  FindCustomer = (data: ISearchCustomer) => {
    const config: AxiosRequestConfig = {
      url: "/customer/list",
      method: "POST",
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

  DeleteCustomer = (data: string[]) => {
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
  FindDefenceQuota = () => {
    const config: AxiosRequestConfig = {
      url: "/customer/defence-quota/list",
      method: "get",
    };
    config.headers = {};
    return config;
  };
  FindServiceDomain = () => {
    const config: AxiosRequestConfig = {
      url: "/service-domain/list",
      method: "post",
      data: {},
    };
    config.headers = {};
    return config;
  };
  EnableCustomer = (data: string[]) => {
    const config: AxiosRequestConfig = {
      url: "/customer/enable",
      method: "put",
      data,
    };
    config.headers = {};
    return config;
  };
  DisableCustomer = (data: string[]) => {
    const config: AxiosRequestConfig = {
      url: "/customer/disable",
      method: "put",
      data,
    };
    config.headers = {};
    return config;
  };

  ResetPassword = (data: {}, params: {}) => {
    const config: AxiosRequestConfig = {
      url: "/customer/reset-password",
      method: "POST",
      data,
    };
    config.headers = {};
    return config;
  };
  ChannelUpdate = (channel: string, uid: string) => {
    const config: AxiosRequestConfig = {
      url: "/customer/channel/update",
      method: "PUT",
      data: { channel, uid },
    };
    config.headers = {};
    return config;
  };
}
export default CustomerAPI;
