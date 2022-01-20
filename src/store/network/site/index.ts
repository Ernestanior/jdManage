import useBehaviorSubject from "@/hooks/useBehaviorSubject";
import siteListService from "./service";
import { ISiteList } from "./interface";

export const useSiteList = () => {
  return useBehaviorSubject<ISiteList>(siteListService.siteList$);
};
