import useBehaviorSubject from "@/hooks/useBehaviorSubject";
import DnsService from "./service";
import { IDomainList } from "./interface";

export const useDomainList = () => {
  return useBehaviorSubject<IDomainList>(DnsService.domainList$);
};
