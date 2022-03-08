import useBehaviorSubject from "@/hooks/useBehaviorSubject";
import CustomerService from "./service";
import { ICustomerList } from "./interface";

export const useCustomerList = () => {
  return useBehaviorSubject<ICustomerList>(CustomerService.customerList$);
};
