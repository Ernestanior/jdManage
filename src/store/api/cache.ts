import { FirewallListSave } from "./../network/firewall/interface";
import { AxiosRequestConfig } from "axios";
import { ISearchDomain } from "@/store/network/dns/interface";
import { CacheSetting } from "@/store/network/cache/interface";

class CacheAPI {
  FindCacheSetting = (uid: string) => {
    const config: AxiosRequestConfig = {
      url: "/cache/site/setting",
      method: "get",
      params: { uid },
    };
    config.headers = {};
    return config;
  };
  SaveCacheSetting = (data: CacheSetting) => {
    const config: AxiosRequestConfig = {
      url: "/cache/site/save",
      method: "post",
      data,
    };
    config.headers = {};
    return config;
  };
  ClearAllCache = (uid: string) => {
    const config: AxiosRequestConfig = {
      url: "/cache/site/clear",
      method: "post",
      data: { type: "all", uid },
    };
    config.headers = {};
    return config;
  };
}
export default CacheAPI;
