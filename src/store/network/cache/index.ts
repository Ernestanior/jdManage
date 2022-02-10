import useBehaviorSubject from "@/hooks/useBehaviorSubject";
import firewallService from "./service";
import { CacheSetting } from "./interface";
export const useCacheSetting = () => {
  return useBehaviorSubject<CacheSetting>(firewallService.cacheSetting$);
};
