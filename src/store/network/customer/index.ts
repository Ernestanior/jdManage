import useBehaviorSubject from "@/hooks/useBehaviorSubject";
import CustomerService from "./service";
import { ICustomerList, IDefenceQuota, IServiceDomain } from "./interface";

export const useCustomerList = () => {
  return useBehaviorSubject<ICustomerList>(CustomerService.customerList$);
};



export const useModifyCustomer = () => {
  return useBehaviorSubject<any>(CustomerService.motifyCustomer$);
};
export const useDefenceQuota = () => {
  return useBehaviorSubject<IDefenceQuota[]>(CustomerService.defenceQuotaList$);
};
export const useServiceDomain = () => {
  return useBehaviorSubject<IServiceDomain[]>(
    CustomerService.serviceDomainList$
  );
};
