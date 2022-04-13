import { AxiosRequestConfig } from "axios";
import { ISearchPage } from "@/store/api/common.interface";

class CompanyAPI {
  FindCompany = (params: ISearchPage) => {
    const config: AxiosRequestConfig = {
      url: "/admin/company/list",
      method: "GET",
      params,
    };
    config.headers = {};
    return config;
  };

  CreateCompany = (data: {}) => {
    const config: AxiosRequestConfig = {
      url: "/company/create",
      method: "POST",
      data,
    };
    config.headers = {};
    return config;
  };

  DeleteCompany = (data: string[]) => {
    const config: AxiosRequestConfig = {
      url: "/company/delete",
      method: "DELETE",
      data,
    };
    config.headers = {};
    return config;
  };

  ModifyCompany = (data: {}) => {
    const config: AxiosRequestConfig = {
      url: "/company/modify",
      method: "POST",
      data,
    };
    config.headers = {};
    return config;
  };
  FindDefenceQuota = () => {
    const config: AxiosRequestConfig = {
      url: "/company/defence-quota/list",
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
  EnableCompany = (data: string[]) => {
    const config: AxiosRequestConfig = {
      url: "/company/enable",
      method: "put",
      data,
    };
    config.headers = {};
    return config;
  };
  DisableCompany = (data: string[]) => {
    const config: AxiosRequestConfig = {
      url: "/company/disable",
      method: "put",
      data,
    };
    config.headers = {};
    return config;
  };

  ResetPassword = (uid: string) => {
    const config: AxiosRequestConfig = {
      url: "/company/reset-password",
      method: "POST",
      params: { uid },
    };
    config.headers = {};
    return config;
  };
  ChannelUpdate = (channel: string, uid: string) => {
    const config: AxiosRequestConfig = {
      url: "/company/channel/update",
      method: "PUT",
      data: { channel, uid },
    };
    config.headers = {};
    return config;
  };
}
export default CompanyAPI;
