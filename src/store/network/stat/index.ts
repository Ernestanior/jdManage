import useBehaviorSubject from "@/hooks/useBehaviorSubject";
import statService from "./service";

export const useStatSiteSupplier = () => {
  return useBehaviorSubject<any>(statService.statSiteSupplierList$);
};
export const useStatSiteBandwidth = () => {
  return useBehaviorSubject<any>(statService.statSiteBandwidthList$);
};
export const useStatSiteFlow = () => {
  return useBehaviorSubject<any>(statService.statSiteFlowList$);
};
export const useStatSiteAvail = () => {
  return useBehaviorSubject<any>(statService.statSiteAvailList$);
};
export const useStatSiteResTime = () => {
  return useBehaviorSubject<any>(statService.statSiteResTimeList$);
};
export const useStatSiteOrigin = () => {
  return useBehaviorSubject<any>(statService.statSiteOriginList$);
};
export const useStatSupplierAvail = () => {
  return useBehaviorSubject<any>(statService.statSupplierAvailList$);
};
export const useStatSupplierResTime = () => {
  return useBehaviorSubject<any>(statService.statSupplierResTimeList$);
};
