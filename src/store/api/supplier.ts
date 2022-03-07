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

  SupplierAccountList = (data: IAccountList) => {
    const config: AxiosRequestConfig = {
      url: "/supplier-account/list",
      method: "POST",
      data,
    };
    config.headers = {};
    return config;
  };
  SupplierInfo = (type: string) => {
    const config: AxiosRequestConfig = {
      url: `/supplier/info/all`,
      method: "GET",
      params: type && { type },
    };
    config.headers = {};
    return config;
  };

  SupplierAccountView = (uid: string) => {
    const config: AxiosRequestConfig = {
      url: `supplier-account/view`,
      method: "GET",
      params: { uid },
    };
    config.headers = {};
    return config;
  };

  SupplierAccountValidate = (data: IValidate) => {
    const config: AxiosRequestConfig = {
      url: `/supplier-account/validate`,
      method: "POST",
      data,
    };
    config.headers = {};
    return config;
  };

  CreateAccount = (data: IcreateAccount) => {
    const config: AxiosRequestConfig = {
      url: "/supplier-account/create",
      method: "POST",
      data,
    };
    config.headers = {};
    return config;
  };

  DisableAccount = (uid: string) => {
    const config: AxiosRequestConfig = {
      url: "/supplier-account/disable",
      method: "PUT",
      data: [uid],
    };
    config.headers = {};
    return config;
  };

  EnableAccount = (uid: string) => {
    const config: AxiosRequestConfig = {
      url: "/supplier-account/enable",
      method: "PUT",
      data: [uid],
    };
    config.headers = {};
    return config;
  };

  DeleteAccount = (uid: string) => {
    const config: AxiosRequestConfig = {
      url: "/supplier-account/delete",
      method: "DELETE",
      data: [uid],
    };
    config.headers = {};
    return config;
  };

  UpdateAccount = (data: IAccountUpdate) => {
    const config: AxiosRequestConfig = {
      url: "/supplier-account/update",
      method: "POST",
      data,
    };
    config.headers = {};
    return config;
  };
}

export default SupplierAPI;

export type IAccountList = {
  keyword?: string;
  name?: string;
  supplier?: string;
  type?: string;
  searchPage?: SearchPage;
};

export type SearchPage = {
  desc?: number;
  page?: number;
  pageSize?: number;
  sort?: string;
};

type IValidate = {
  supplier: {
    code: string;
    tokenValue: object;
  };
};

export type IcreateAccount = {
  name: string;
  quota: {
    domain: {
      capacity: number;
    };
  };
  remark: string;
  status: string;
  supplier: {
    code: string;
    tokenValue: object;
  };
};

export type IAccountUpdate = {
  name: string;
  uid: string;
  remark: string;
  status: string;
  supplier: {
    code: string;
    tokenValue: any;
  };
};
