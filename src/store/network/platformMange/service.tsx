import request from "@/store/request";
import { BehaviorSubject, from } from "rxjs";
import { platformManageApi } from "../../api";

class PlatformManage {
  readonly platformManageSupplierList$ = new BehaviorSubject<any>(null);
  readonly platformManangeSupplierInfo$ = new BehaviorSubject<any>(null);

  SupplierAccountList(data: any) {
    from(
      request(platformManageApi.PlatformManageSupplierList({}, data))
    ).subscribe((data) => {
      if (data) {
        console.log(data, "data");
        this.platformManageSupplierList$.next(data);
      }
    });
  }

  SupplierInfo(type: any) {
    from(
      request(platformManageApi.PlatformManageSupplierInfo(type))
    ).subscribe((data) => {
      if (data) {
        this.platformManangeSupplierInfo$.next(data);
      }
    });
  }
}

const platformManage = new PlatformManage();
export default platformManage;
