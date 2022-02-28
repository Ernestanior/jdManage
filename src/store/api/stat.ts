import { ITimeFilter } from "@/components/timeFilter";
import { AxiosRequestConfig } from "axios";
import {
  IStatSiteAvail,
  IStatSiteBandwidth,
  IStatSiteFlow,
  IStatSiteOrigin,
  IStatSiteSupplier,
  IStatSupplierAvail,
} from "../network/stat/interface";

class StatAPI {
  StatSiteSupplier = (data: IStatSiteSupplier) => {
    const config: AxiosRequestConfig = {
      url: "/stat/site/supplier",
      method: "post",
      params: { uid: data.uid },
      data,
    };
    config.headers = {};
    return config;
  };
  StatSiteAvail = (uid: string, data: IStatSiteAvail) => {
    const config: AxiosRequestConfig = {
      url: "/stat/site/availability",
      method: "post",
      params: { uid },
      data,
    };
    config.headers = {};
    return config;
  };
  StatSiteResTime = (uid: string, data: IStatSiteAvail) => {
    const config: AxiosRequestConfig = {
      url: "/stat/site/response-time",
      method: "post",
      params: { uid },
      data,
    };
    config.headers = {};
    return config;
  };
  StatSiteOrigin = (uid: string, data: IStatSiteOrigin) => {
    const config: AxiosRequestConfig = {
      url: "/stat/site/origin",
      method: "post",
      params: { uid },
      data,
    };
    config.headers = {};
    return config;
  };
  StatSiteBandwidth = (uid: string, data: IStatSiteBandwidth) => {
    const config: AxiosRequestConfig = {
      url: "/stat/site/bandwidth",
      method: "post",
      params: { uid },
      data,
    };
    config.headers = {};
    return config;
  };
  StatSiteFlow = (uid: string, data: IStatSiteFlow) => {
    const config: AxiosRequestConfig = {
      url: "/stat/site/flow",
      method: "post",
      params: { uid },
      data,
    };
    config.headers = {};
    return config;
  };
  StatSupplierAvail = (uid: string, data: IStatSupplierAvail) => {
    const config: AxiosRequestConfig = {
      url: "/stat/supplier/availability",
      method: "post",
      params: { uid },
      data,
    };
    config.headers = {};
    return config;
  };
  StatSupplierResTime = (uid: string, data: IStatSupplierAvail) => {
    const config: AxiosRequestConfig = {
      url: "/stat/supplier/response-time",
      method: "post",
      params: { uid },
      data,
    };
    config.headers = {};
    return config;
  };
  StatCusOverview = (customerUid: string, reportType: ITimeFilter) => {
    const config: AxiosRequestConfig = {
      url: "/stat/customer-overview",
      method: "post",
      data: { customerUid, ...reportType },
    };
    config.headers = {};
    return config;
  };
  StatCusSupplier = (customerUid: string) => {
    const config: AxiosRequestConfig = {
      url: "/stat/customer/supplier",
      method: "get",
      params: { customerUid },
    };
    config.headers = {};
    return config;
  };
  StatTraControlCurrDay = (customerUid: string) => {
    const config: AxiosRequestConfig = {
      url: "/stat/traffic-control/current-day-flow",
      method: "post",
      data: { customerUid },
    };
    config.headers = {};
    return config;
  };
  StatTraControlCurrMonth = (customerUid: string) => {
    const config: AxiosRequestConfig = {
      url: "/stat/traffic-control/current-month-flow",
      method: "post",
      data: { customerUid },
    };
    config.headers = {};
    return config;
  };
  StatTraControlLastHour = (customerUid: string) => {
    const config: AxiosRequestConfig = {
      url: "/stat/traffic-control/last-hour-bandwidth",
      method: "post",
      data: { customerUid },
    };
    config.headers = {};
    return config;
  };
}
export default StatAPI;
