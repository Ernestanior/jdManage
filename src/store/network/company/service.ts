import { BehaviorSubject, from } from "rxjs";
import request from "@/store/request";
import { companyApi } from "@/store/api";
import { ISearchPage } from "@/store/api/common.interface";

/**
 * 用户相关功能
 */
class Company {
  readonly companyList$ = new BehaviorSubject<ICompanyList | null>(null);

  findCompany(data: ISearchPage) {
    from(request(companyApi.FindCompany(data))).subscribe((res) => {
      this.companyList$.next(res);
    });
  }
}

const companyService = new Company();

export default companyService;
