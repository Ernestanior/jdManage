import useBehaviorSubject from "@/hooks/useBehaviorSubject";
import SupplierService from "./service";
// import { IDomainList } from "./interface";

export const useSiteSupplierList = () => {
  return useBehaviorSubject<any>(SupplierService.siteSupplierList$);
};
export const useSupplierAccountList = () => {
  return useBehaviorSubject<any>(SupplierService.supplierAccountList$);
};
export const useSupplierInfo = () => {
  return useBehaviorSubject<any>(SupplierService.supplierInfo$);
};
export const useSupplierAccountView = () => {
  return useBehaviorSubject<any>(SupplierService.supplierAccountView$);
};
