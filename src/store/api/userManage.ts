import { AxiosRequestConfig } from "axios";
/**
 * @class UserAPI
 * @description 用户管理API
 * @return 返回request的config
 */
class UserManageAPI {
  UserManageCustomerList = (params: any, data: any) => {
    const config: AxiosRequestConfig = {
      url: "/customer/list",
      method: "POST",
      params,
      data,
    };
    config.headers = {};
    return config;
  };
}

export default UserManageAPI;