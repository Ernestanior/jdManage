import { IAdminInfo } from "./../network/admin/interface";
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
  DeleteAdmin = (companyId: number) => {
    const config: AxiosRequestConfig = {
      url: `/admin/company/deleteById/${companyId}`,
      method: "DELETE",
    };
    config.headers = {};
    return config;
  };
  UpdateAdmin = (data: ICompanyInfo) => {
    const config: AxiosRequestConfig = {
      url: "/admin/company/updateCompany",
      method: "PUT",
      data,
    };
    config.headers = {};
    return config;
  };
}
export default AdminAPI;
