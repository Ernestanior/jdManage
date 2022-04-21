import useBehaviorSubject from "@/hooks/useBehaviorSubject";
import companyService from "./service";

export const useCompanyList = () => {
  return useBehaviorSubject<ICompanyList>(companyService.companyList$);
};
