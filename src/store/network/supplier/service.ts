import { BehaviorSubject, from } from "rxjs";
import request from "@/store/request";
import { supplierApi } from "@/store/api";
// import { ISupplierList } from "./interface";

/**
 * 用户相关功能
 */
class Supplier {
  readonly supplierList$ = new BehaviorSubject<any | null>(null);
  readonly siteSupplierList$ = new BehaviorSubject<any | null>(null);

  findSupplier(uid: string) {
    from(request(supplierApi.FindSupplier(uid))).subscribe((data) => {
      if (data) {
        this.supplierList$.next(data);
      }
    });
  }
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
