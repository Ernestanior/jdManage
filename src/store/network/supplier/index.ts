import useBehaviorSubject from "@/hooks/useBehaviorSubject";
import SupplierService from "./service";
// import { IDomainList } from "./interface";

export const useSupplierList = () => {
  return useBehaviorSubject<any>(SupplierService.supplierList$);
};
export const useSiteSupplierList = () => {
  return useBehaviorSubject<any>(SupplierService.siteSupplierList$);
};
export const useSiteSupplierList$ = () => {
  return useBehaviorSubject<any>(SupplierService.siteSupplierList$$);
};
export const useManagementList = () => {
  return useBehaviorSubject<any>(SupplierService.managementList$);
};
