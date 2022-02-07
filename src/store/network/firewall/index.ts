import useBehaviorSubject from "@/hooks/useBehaviorSubject";
import firewallService from "./service";
import { FirewallList } from "./interface";
export const useWhiteIP = () => {
  return useBehaviorSubject<FirewallList>(firewallService.whiteIP$);
};
export const useBlackIP = () => {
  return useBehaviorSubject<FirewallList>(firewallService.blackIP$);
};
export const useWhiteUA = () => {
  return useBehaviorSubject<FirewallList>(firewallService.whiteUA$);
};
export const useBlackUA = () => {
  return useBehaviorSubject<FirewallList>(firewallService.blackUA$);
};
