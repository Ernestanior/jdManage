import useBehaviorSubject from "@/hooks/useBehaviorSubject";
import CustomerService from "./service";




export const useCustomerList = () => {
  return useBehaviorSubject<any>(CustomerService.CustomerList$);
};


