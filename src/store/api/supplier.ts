import { AxiosRequestConfig } from "axios";

class SupplierAPI {
  /**
   * findSupplier
   * 生成请求参数
   */
  FindSupplier = (customerUid: string) => {
    const config: AxiosRequestConfig = {
      url: "/supplier/list",
      method: "get",
      params: { type: "purchased", customerUid },
    };
    config.headers = {};
    return config;
  };
  /**
   * findSupplierBySite
   * 生成请求参数
   */
  FindSiteSupplier = (uid: string) => {
    const config: AxiosRequestConfig = {
      url: "/site/supplier/list",
      method: "post",
      data: { uid },
    };
    config.headers = {};
    return config;
  };
}
export default SupplierAPI;
