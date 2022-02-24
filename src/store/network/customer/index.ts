import useBehaviorSubject from "@/hooks/useBehaviorSubject";
import CustomerService from "./service";
import { ICustomerList } from "./interface";
import { retry } from "rxjs";

export const useCreateCustomer = () => {
  return useBehaviorSubject<any>(CustomerService.createCustomer$);
};

export const useDeleteCustomer = () => {
  return useBehaviorSubject<any>(CustomerService.deleteCustomer$);
};

export const useModifyCustomer = () => {
  return useBehaviorSubject<any>(CustomerService.motifyCustomer$);
};

export const useCustomerList = () => {
  return useBehaviorSubject<any>(CustomerService.CustomerList$);
};

export const useResetCustomerPassword = () => {
  return useBehaviorSubject<any>(CustomerService.resetCustomerPassword$);
};

export const useDisableCustomer = () => {
  return useBehaviorSubject<any>(CustomerService.disableCustomer$);
};

export const useEnableCustomer = () => {
  return useBehaviorSubject<any>(CustomerService.enableCustomer$);
};
