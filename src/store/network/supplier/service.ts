import { BehaviorSubject, from } from "rxjs";
import request from "@/store/request";
import { supplierApi } from "@/store/api";
import { ISiteSupplierList } from "./interface";
import { IAccountList } from "@/store/api/supplier";
// import { ISupplierList } from "./interface";

/**
 * 用户相关功能
 */
class Supplier {
  readonly siteSupplierList$ = new BehaviorSubject<any | null>(null);

  findSiteSupplier(uid: string) {
    from(request(supplierApi.FindSiteSupplier(uid))).subscribe((data) => {
      if (data) {
        this.siteSupplierList$.next(data);
      }
    });
  }
}

const SupplierService = new Supplier();

export default SupplierService;
