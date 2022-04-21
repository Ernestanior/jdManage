import { BehaviorSubject, from } from "rxjs";
import request from "@/store/request";
import { companyApi } from "@/store/api";

/**
 * 用户相关功能
 */
class Company {
  readonly companyList$ = new BehaviorSubject<ICompanyList | null>(null);

  findCompany(pageNum: number, pageSize: number) {
    from(request(companyApi.FindCompany(pageNum, pageSize))).subscribe(
      (res) => {
        this.companyList$.next(res);
      }
    );
  }
}

const companyService = new Company();

export default companyService;
