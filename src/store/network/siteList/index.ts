import useBehaviorSubject from "@/hooks/useBehaviorSubject";
import siteListService from "./service";
import { ISiteList } from "./interface";

const useSiteList = () => {
  return useBehaviorSubject<ISiteList>(siteListService.siteList$);
};

export default useSiteList;
