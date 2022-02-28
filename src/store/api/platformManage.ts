import { AxiosRequestConfig } from "axios";
import { methods } from "underscore";
/**
 * @class UserAPI
 * @description 用户管理API
 * @return 返回request的config
 */
class PlatformManageAPI {
  PlatformManageSupplierList = (params: any, data: any) => {
    const config: AxiosRequestConfig = {
      url: "/supplier-account/list",
      method: "POST",
      params,
      data,
    };
    config.headers = {};
    return config;
  };

  PlatformManageSupplierInfo = (type: any) => {
    const config: AxiosRequestConfig = {
      url: `/supplier/info/all?${type ? "type=" : ""}${type ? type : ""}`,
      method: "GET",
    };
    config.headers = {};
    return config;
  };

  PlatformManageSupplierAccountView = (params: any) => {
    const config: AxiosRequestConfig = {
      url: `supplier-account/view?uid=${params.data}`,
      method: "GET",
    };
    config.headers = {};
    return config;
  };

  PlatformManageSupplierAccountValidate = (data: any) => {
    const config: AxiosRequestConfig = {
      url: `/supplier-account/validate`,
      method: "POST",
    };
    config.headers = {};
    return config;
  };
}

export default PlatformManageAPI;
