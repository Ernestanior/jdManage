import { AxiosRequestConfig } from "axios";
import {
  ISearchDnsCname,
  IDnsDomain,
  IDnsRecord,
  ISearchDomain,
  IBatchRecords,
  IValidateCName,
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
  FindDnsDomain = (data: IDnsDomain|ISearchDomain) => {
    const config: AxiosRequestConfig = {
      url: "/dns/domain/list",
      method: "post",
      data,
    };
    config.headers = {};
    return config;
  };
  FindDnsRecord = (data: IDnsRecord|ISearchDomain) => {
    const config: AxiosRequestConfig = {
      url: "/dns/record/list",
      method: "post",
      data,
    };
    config.headers = {};
    return config;
  };
  FindDnsCnameList = (data: ISearchDnsCname) => {
    const config: AxiosRequestConfig = {
      url: "/ssl/certgen/dns/list-cnames",
      method: "post",
      data,
    };
    config.headers = {};
    return config;
  };
  CreateBatchRecords = (data: IBatchRecords) => {
    const config: AxiosRequestConfig = {
      url: "/dns/record/batch/create",
      method: "post",
      data,
    };
    config.headers = {};
    return config;
  };
  FindCustomerLineList = () => {
    const config: AxiosRequestConfig = {
      url: "/dns/line/customer/list",
      method: "post",
      data: { useTreeView: true },
    };
    config.headers = {};
    return config;
  };
  ValidateCName = (data: any) => {
    const config: AxiosRequestConfig = {
      url: "/domain/validate-cname",
      method: "post",
      data,
    };
    config.headers = {};
    return config;
  };
  ValidateDNS = (siteUid: string, domain: string) => {
    const config: AxiosRequestConfig = {
      url: "/ssl/certgen/dns/validate",
      method: "post",
      data: { siteUid, domain },
    };
    config.headers = {};
    return config;
  };
  FindDomainCount = (customerUid: string) => {
    const config: AxiosRequestConfig = {
      url: "/domain/count",
      method: "get",
      params: { customerUid },
    };
    config.headers = {};
    return config;
  };
  FindCustomerList = (data: IDnsDomain) => {
    const config: AxiosRequestConfig = {
      url: "/dns/customer/list",
      method: "POST",
      data,
    };
    config.headers = {};
    return config;
  };

  CertRequest = (data: any) => {
    const config: AxiosRequestConfig = {
      url: "/dns/cert/certgen/request",
      method: "POST",
      data,
    };
    config.headers = {};
    return config;
  };
  Disable = (data: any) => {
    const config: AxiosRequestConfig = {
      url: "/dns/domain/disable",
      method: "PUT",
      data,
    };
    config.headers = {};
    return config;
  };

  Enable = (data: any) => {
    const config: AxiosRequestConfig = {
      url: "/dns/domain/enable",
      method: "PUT",
      data,
    };
    config.headers = {};
    return config;
  };

  DomainDelete = (data: string[]) => {
    const config: AxiosRequestConfig = {
      url: "/dns/domain/delete",
      method: "DELETE",
      data,
    };
    config.headers = {};
    return config;
  };

  CreateDomain = (data: any) => {
    const config: AxiosRequestConfig = {
      url: "/dns/domain/create",
      method: "POST",
      data,
    };
    config.headers = {};
    return config;
  };
  CloneDomain = (data: { names: []; uid: string }) => {
    const config: AxiosRequestConfig = {
      url: "/dns/domain/clone",
      method: "POST",
      data,
    };
    config.headers = {};
    return config;
  };
  
  DnsCertList = (data: any) => {
    const config: AxiosRequestConfig = {
      url: "/dns/cert/list",
      method: "POST",
      data,
    };
    config.headers = {};
    return config;
  };

  DnsCertDelete = (uid: string) => {
    const config: AxiosRequestConfig = {
      url: "/dns/cert/delete",
      method: "DELETE",
      data: [uid],
    };
    config.headers = {};
    return config;
  };
  
}


export default DnsAPI;
