import useBehaviorSubject from "@/hooks/useBehaviorSubject";
import siteService from "./service";
import { ISiteList, ISslList } from "./interface";

export const useSiteList = () => {
  return useBehaviorSubject<ISiteList>(siteService.siteList$);
};
export const useSiteAll = () => {
  return useBehaviorSubject<any[]>(siteService.siteAllList$);
};
export const useSiteInfo = () => {
  return useBehaviorSubject<any>(siteService.siteInfo$);
};
export const useSslList = () => {
  return useBehaviorSubject<ISslList>(siteService.sslList$);
};
export const useCNameList = () => {
  return useBehaviorSubject<ISslList>(siteService.cnameList$);
};
export const useSuffix = () => {
  return useBehaviorSubject<string>(siteService.suffix$);
};
