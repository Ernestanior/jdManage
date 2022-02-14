import { AxiosRequestConfig } from "axios";
import {
  IDnsDomain,
  IDnsRecord,
  ISearchDomain,
} from "@/store/network/dns/interface";

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
  FindDnsDomain = (data: IDnsDomain) => {
    const config: AxiosRequestConfig = {
      url: "/dns/domain/list",
      method: "post",
      data,
    };
    config.headers = {};
    return config;
  };
  FindDnsRecord = (data: IDnsRecord) => {
    const config: AxiosRequestConfig = {
      url: "/dns/record/list",
      method: "post",
      data,
    };
    config.headers = {};
    return config;
  };
}
export default DnsAPI;
