import useBehaviorSubject from "@/hooks/useBehaviorSubject";
import DnsService from "./service";
import { IDnsCname } from "./interface";

export const useRecordLoading = () => {
  return useBehaviorSubject<boolean>(DnsService.recordLoading);
};
export const useDnsCnameList = () => {
  return useBehaviorSubject<IDnsCname[]>(DnsService.dnsCnameList$);
};
