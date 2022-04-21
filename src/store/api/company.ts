import { AxiosRequestConfig } from "axios";

class CompanyAPI {
  FindCompany = (pageNum: number, pageSize: number) => {
    const config: AxiosRequestConfig = {
      url: `/admin/company/list/${pageNum}/${pageSize}`,
      method: "GET",
    };
    config.headers = {};
    return config;
  };

  CreateCompany = (data: INewCompany) => {
    const config: AxiosRequestConfig = {
      url: "/admin/company/insertCompany",
      method: "POST",
      data,
    };
    config.headers = {};
    return config;
  };

  UploadCompanyLogo = (cid: number, data: FormData) => {
    const config: AxiosRequestConfig = {
      url: `/admin/company/logo/${cid}`,
      method: "POST",
      data,
    };
    config.headers = {};
    return config;
  };

  DeleteCompany = (companyId: number) => {
    const config: AxiosRequestConfig = {
      url: `/admin/company/deleteById/${companyId}`,
      method: "DELETE",
    };
    config.headers = {};
    return config;
  };
  DetailCompany = (compId: number) => {
    const config: AxiosRequestConfig = {
      url: `/admin/company/queryById/${compId}`,
      method: "GET",
    };
    config.headers = {};
    return config;
  };
  UpdateCompany = (data: ICompanyInfo) => {
    const config: AxiosRequestConfig = {
      url: "/admin/company/updateCompany",
      method: "PUT",
      data,
    };
    config.headers = {};
    return config;
  };
}
export default CompanyAPI;
