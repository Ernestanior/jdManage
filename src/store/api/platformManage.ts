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

  PlatformManageSupplierAccountValidate = (data: IValidate) => {
    const config: AxiosRequestConfig = {
      url: `/supplier-account/validate`,
      method: "POST",
      data,
    };
    config.headers = {};
    return config;
  };

  PlatformManageCreateAccount = (data: IcreateAccount)=>{
    const config: AxiosRequestConfig={
      url:"/supplier-account/create",
      method:"POST",
      data,
    };
    config.headers={};
    return config;
  }
}

export default PlatformManageAPI;

type IValidate = {
  supplier: {
    code: string;
    tokenValue: object;
  };
};

export type IcreateAccount={
  name: string,
  quota:{
    domain:{
      capacity: number,
    }
  }
  remark: string,
  status:string,
  supplier:{
    code:string,
    tokenValue:object
  },
  

}