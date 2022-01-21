import useBehaviorSubject from "@/hooks/useBehaviorSubject";
import siteListService from "./service";
import { ISiteList } from "./interface";

export const useSiteList = () => {
  return useBehaviorSubject<ISiteList>(siteListService.siteList$);
};
export const useSiteAll = () => {
  return useBehaviorSubject<any[]>(siteListService.siteAllList$);
};
export const useSiteInfo = () => {
  return useBehaviorSubject<any>(siteListService.siteInfo$);
};
