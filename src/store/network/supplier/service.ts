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
  readonly supplierList$ = new BehaviorSubject<any | null>(null);
  readonly siteSupplierList$ = new BehaviorSubject<any | null>(null);
  readonly siteSupplierList$$ = new BehaviorSubject<any | null>(null);
  readonly managementList$ = new BehaviorSubject<any | null>(null);
  readonly supplierAccountList$ = new BehaviorSubject<any | null>(null);
  readonly supplierInfo$ = new BehaviorSubject<any | null>(null);
  readonly supplierAccountView$ = new BehaviorSubject<any|null>(null);

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
  findSiteSupplierList(data: ISiteSupplierList) {
    from(request(supplierApi.FindSiteSupplierList(data))).subscribe((data) => {
      if (data) {
        this.siteSupplierList$$.next(data);
      }
    });
  }
  findManagementList(uid: string) {
    from(request(supplierApi.FindManagementList(uid))).subscribe((data) => {
      if (data) {
        this.managementList$.next(data);
      }
    });
  }

  supplierAccountList(data: IAccountList) {
    from(request(supplierApi.SupplierAccountList(data))).subscribe((data) => {
      if (data) {
        this.supplierAccountList$.next(data);
      }
    });
  }

  supplierInfo(type: string) {
    from(request(supplierApi.SupplierInfo(type))).subscribe((data) => {
      if (data) {
        this.supplierInfo$.next(data);
      }
    });
  }
  supplierAccountView(uid: string) {
    if (uid !== "") {
      from(
        request(supplierApi.SupplierAccountView(uid))
      ).subscribe((data) => {
        if (data) {
          this.supplierAccountView$.next(data);
        }
      });
    }
  }
  

}

const SupplierService = new Supplier();

export default SupplierService;
