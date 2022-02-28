import useBehaviorSubject from "@/hooks/useBehaviorSubject";
import DnsService from "./service";
import {
  IBatchRecordsResult,
  IDnsCname,
  IDomainCount,
  IDomainLine,
  IDomainList,
  IValidateCNameResult,
} from "./interface";

export const useDomainList = () => {
  return useBehaviorSubject<IDomainList>(DnsService.domainList$);
};
export const useDnsDomainList = () => {
  return useBehaviorSubject<IDomainList>(DnsService.dnsDomainList$);
};
export const useCustomerLineList = () => {
  return useBehaviorSubject<IDomainLine[]>(DnsService.customerLineList$);
};
// export const useBatchRecords = () => {
//   return useBehaviorSubject<IBatchRecordsResult[]>(
//     DnsService.createBatchRecordsResult$
//   );
// };
export const useRecordLoading = () => {
  return useBehaviorSubject<boolean>(DnsService.recordLoading);
};
export const useDnsCnameList = () => {
  return useBehaviorSubject<IDnsCname[]>(DnsService.dnsCnameList$);
};
export const useCNameValidated = () => {
  return useBehaviorSubject<IValidateCNameResult>(
    DnsService.cNameValidatedResult$
  );
};
export const useDomainCount = () => {
  return useBehaviorSubject<IDomainCount>(DnsService.domainCountList$);
};
