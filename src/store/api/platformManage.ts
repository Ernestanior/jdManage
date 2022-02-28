import { AxiosRequestConfig } from "axios";
import { methods } from "underscore";
import { IAccountList } from "../network/platformMange/service";
/**
 * @class UserAPI
 * @description 用户管理API
 * @return 返回request的config
 */
class PlatformManageAPI {
  PlatformManageSupplierList = (data: IAccountList) => {
    console.log(data,"dataaaaa");
    const config: AxiosRequestConfig = {
      url: "/supplier-account/list",
      method: "POST",
      data,
    };
    config.headers = {};
    return config;
  };

  PlatformManageSupplierInfo = (type: string) => {
    const config: AxiosRequestConfig = {
      url: `/supplier/info/all?${type ? "type=" : ""}${type ? type : ""}`,
      method: "GET",
    };
    config.headers = {};
    return config;
  };

  PlatformManageSupplierAccountView = (uid: string) => {
    const config: AxiosRequestConfig = {
      url: `supplier-account/view?uid=${uid}`,
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
