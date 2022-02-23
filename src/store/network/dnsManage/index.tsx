import useBehaviorSubject from "@/hooks/useBehaviorSubject";

import dnsManage from "./service";


export const useDnsCustomerList = () => {
  return useBehaviorSubject<any>(dnsManage.dnsManageCustomerList$);
};

export const useDomainList = () => {
  return useBehaviorSubject<any>(dnsManage.dnsManageDomainList$);
};

export const useRecordList = ()=>{
    return useBehaviorSubject<any>(dnsManage.dnsManageRecordList$);
}

export const useDnsCertList= ()=>{
  return useBehaviorSubject<any>(dnsManage.dnsManageCertList$);
}