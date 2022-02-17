import useBehaviorSubject from "@/hooks/useBehaviorSubject";
import sslManage from "./service";

export const useSslManageCustomerList = () => {
  return useBehaviorSubject<any>(sslManage.sslCustomerList$);
};

export const useSslManageCerList = ()=>{
    return useBehaviorSubject<any>(sslManage.sslCertList$);
}

export const useSslManageOriginCertList = ()=>{
    return useBehaviorSubject<any>(sslManage.sslOriginCertList$);
}