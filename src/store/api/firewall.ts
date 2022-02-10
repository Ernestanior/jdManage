import { FirewallListSave } from "./../network/firewall/interface";
import { AxiosRequestConfig } from "axios";
import { ISearchDomain } from "@/store/network/dns/interface";

class FirewallAPI {
  FindWhiteIP = (uid: string) => {
    const config: AxiosRequestConfig = {
      url: "/waf/whitelist/setting",
      method: "get",
      params: { uid },
    };
    config.headers = {};
    return config;
  };
  FindBlackIP = (uid: string) => {
    const config: AxiosRequestConfig = {
      url: "/waf/blacklist/setting",
      method: "get",
      params: { uid },
    };
    config.headers = {};
    return config;
  };
  FindWhiteUA = (uid: string) => {
    const config: AxiosRequestConfig = {
      url: "/site/user-agent/allowlist/setting",
      method: "get",
      params: { uid },
    };
    config.headers = {};
    return config;
  };
  FindBlackUA = (uid: string) => {
    const config: AxiosRequestConfig = {
      url: "/site/user-agent/blocklist/setting",
      method: "get",
      params: { uid },
    };
    config.headers = {};
    return config;
  };
  SaveWhiteIP = (data: FirewallListSave) => {
    const config: AxiosRequestConfig = {
      url: "/waf/whitelist/save",
      method: "post",
      data,
    };
    config.headers = {};
    return config;
  };
  SaveBlackIP = (data: FirewallListSave) => {
    const config: AxiosRequestConfig = {
      url: "/waf/blacklist/save",
      method: "post",
      data,
    };
    config.headers = {};
    return config;
  };
  SaveWhiteUA = (data: FirewallListSave) => {
    const config: AxiosRequestConfig = {
      url: "/site/user-agent/allowlist/save",
      method: "post",
      data,
    };
    config.headers = {};
    return config;
  };
  SaveBlackUA = (data: FirewallListSave) => {
    const config: AxiosRequestConfig = {
      url: "/site/user-agent/blocklist/save",
      method: "post",
      data,
    };
    config.headers = {};
    return config;
  };
}
export default FirewallAPI;
