import useBehaviorSubject from "@/hooks/useBehaviorSubject";
import DnsService from "./service";
// import { IDomainList } from "./interface";

export const useSupplierList = () => {
  return useBehaviorSubject<any>(DnsService.supplierList$);
};
