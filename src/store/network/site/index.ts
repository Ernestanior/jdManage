import useBehaviorSubject from "@/hooks/useBehaviorSubject";
import siteListService from "./service";
import { ISiteList, ISslList } from "./interface";

export const useSiteList = () => {
  return useBehaviorSubject<ISiteList>(siteListService.siteList$);
};
export const useSiteAll = () => {
  return useBehaviorSubject<any[]>(siteListService.siteAllList$);
};
export const useSiteInfo = () => {
  return useBehaviorSubject<any>(siteListService.siteInfo$);
};
export const useSslList = () => {
  return useBehaviorSubject<ISslList>(siteListService.sslList$);
};
export const useCNameList = () => {
  return useBehaviorSubject<ISslList>(siteListService.cnameList$);
};
export const useSuffix = () => {
  return useBehaviorSubject<string>(siteListService.suffix$);
};
