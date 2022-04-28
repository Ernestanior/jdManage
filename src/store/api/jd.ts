import { AxiosRequestConfig } from "axios";

class JdAPI {
  /**
   * findDomain
   * 生成请求参数
   */
  FindJd = (pageNum: number, pageSize: number) => {
    const config: AxiosRequestConfig = {
      url: `/admin/jd/list/${pageNum}/${pageSize}`,
      method: "get",
    };
    config.headers = {};
    return config;
  };
  DetailJd = (jdId: number) => {
    const config: AxiosRequestConfig = {
      url: `/jd/query/${jdId}`,
      method: "get",
    };
    config.headers = {};
    return config;
  };
  CreateJd = (data: IJdForm) => {
    const config: AxiosRequestConfig = {
      url: "/admin/jd/publish",
      method: "post",
      data,
    };
    config.headers = {};
    return config;
  };
  EditJd = (data: IJdForm) => {
    const config: AxiosRequestConfig = {
      url: "/admin/jd/update",
      method: "put",
      data,
    };
    config.headers = {};
    return config;
  };
  DeleteJd = (jdId: number) => {
    const config: AxiosRequestConfig = {
      url: `/admin/jd/del/${jdId}`,
      method: "delete",
    };
    config.headers = {};
    return config;
  };
}
interface IJdForm {
  id?: number;
  city?: string;
  company?: number;
  desc?: string;
  ind?: string;
  pay?: string;
  roleName?: string;
  type?: number;
  edu?: string;
  email?: string;
  tags?: string;
  wechatId?: string;
}
export default JdAPI;
