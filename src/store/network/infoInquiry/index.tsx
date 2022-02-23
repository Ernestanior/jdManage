import useBehaviorSubject from "@/hooks/useBehaviorSubject";

import infoInquiry from "./service";


export const useSite = () => {
  return useBehaviorSubject<any>(infoInquiry.infoInquirySite$);
};

export const useInfoInquiryCustomerList = () => {
  return useBehaviorSubject<any>(infoInquiry.infoInquiryCustomerList$);
};

export const useInfoInquiryDomainList = () =>{
    return useBehaviorSubject<any>(infoInquiry.infoInquiryDomainList$);
}
