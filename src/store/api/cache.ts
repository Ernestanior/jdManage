import { AxiosRequestConfig } from "axios";

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

export interface CacheSetting {
  cacheExt: string;
  cacheMethod: string;
  ignoreQueryString: boolean;
  ttl: number;
  uid: string;
}
