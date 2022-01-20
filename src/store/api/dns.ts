import { AxiosRequestConfig } from "axios";
import { ISearchDomain } from "@/store/network/dns/interface";

class DnsAPI {
  /**
   * findDomain
   * 生成请求参数
   */
  FindDomain = (data: ISearchDomain) => {
    const config: AxiosRequestConfig = {
      url: "/domain/list",
      method: "post",
      data,
    };
    config.headers = {};
    return config;
  };
}
export default DnsAPI;
