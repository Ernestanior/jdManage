import { AxiosRequestConfig } from "axios";
import {
  IChangeOption,
  ISaveManagement,
  ISiteSupplierList,
} from "../network/supplier/interface";

class SupplierAPI {
  FindSupplier = (customerUid: string) => {
    const config: AxiosRequestConfig = {
      url: "/supplier/list",
      method: "get",
      params: { type: "purchased", customerUid },
    };
    config.headers = {};
    return config;
  };
  FindSiteSupplier = (uid: string) => {
    const config: AxiosRequestConfig = {
      url: "/site/supplier/list",
      method: "post",
      data: { uid },
    };
    config.headers = {};
    return config;
  };
  FindSiteSupplierList = (data: ISiteSupplierList) => {
    const config: AxiosRequestConfig = {
      url: "/site/supplier/list",
      method: "post",
      data,
    };
    config.headers = {};
    return config;
  };
  FindManagementList = (uid: string) => {
    const config: AxiosRequestConfig = {
      url: "/site/supplier/management/list",
      method: "get",
      params: { uid },
    };
    config.headers = {};
    return config;
  };
  SaveManagement = (data: ISaveManagement) => {
    const config: AxiosRequestConfig = {
      url: "/site/supplier/management/save",
      method: "post",
      data,
    };
    config.headers = {};
    return config;
  };
  ChangeOption = (data: IChangeOption) => {
    const config: AxiosRequestConfig = {
      url: "/site/supplier/change-option",
      method: "post",
      data,
    };
    config.headers = {};
    return config;
  };
}
export default SupplierAPI;
