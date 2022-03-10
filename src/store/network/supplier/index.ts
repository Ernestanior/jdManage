import useBehaviorSubject from "@/hooks/useBehaviorSubject";
import SupplierService from "./service";

export const useSiteSupplierList = () => {
  return useBehaviorSubject<any>(SupplierService.siteSupplierList$);
};
