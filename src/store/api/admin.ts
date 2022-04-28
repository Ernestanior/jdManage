import { IAdminInfo, IAdminUpdate } from "./../network/admin/interface";
import { AxiosRequestConfig } from "axios";

class AdminAPI {
  FindAdmin = (pageNum: number, pageSize: number) => {
    const config: AxiosRequestConfig = {
      url: `/admin/super/list/${pageNum}/${pageSize}`,
      method: "GET",
    };
    config.headers = {};
    return config;
  };

  CreateAdmin = (data: IAdminInfo) => {
    const config: AxiosRequestConfig = {
      url: "/admin/super/new",
      method: "POST",
      data,
    };
    config.headers = {};
    return config;
  };
  UpdateAdmin = (data: IAdminUpdate) => {
    const config: AxiosRequestConfig = {
      url: "/admin/super/modifyPwd",
      method: "PUT",
      data,
    };
    config.headers = {};
    return config;
  };
}
export default AdminAPI;
