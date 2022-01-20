import { BehaviorSubject, from } from "rxjs";
import request from "@/store/request";
import { supplierApi } from "@/store/api";
// import { ISupplierList } from "./interface";

/**
 * 用户相关功能
 */
class Supplier {
  readonly supplierList$ = new BehaviorSubject<any | null>(null);

  findSupplier() {
    from(request(supplierApi.FindSupplier())).subscribe((data) => {
      if (data) {
        this.supplierList$.next(data);
      }
    });
  }
}

const SupplierService = new Supplier();

export default SupplierService;
