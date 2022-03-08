import useBehaviorSubject from "@/hooks/useBehaviorSubject";
import sslManage from "./service";

export const useSslManageCerList = () => {
  return useBehaviorSubject<any>(sslManage.sslCertList$);
};

export const useSslManageOriginCertList = () => {
  return useBehaviorSubject<any>(sslManage.sslOriginCertList$);
};
export const useViewCert = () => {
  return useBehaviorSubject<any>(sslManage.sslViewCert$);
};

export const useViewOriginCert = () => {
  return useBehaviorSubject<any>(sslManage.sslViewOriginCert$);
};
