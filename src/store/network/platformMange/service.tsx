import request from "@/store/request";
import { BehaviorSubject, from } from "rxjs";
import { platformManageApi } from "../../api";

class PlatformManage {
  readonly platformManageSupplierList$ = new BehaviorSubject<any>(null);
  readonly platformManangeSupplierInfo$ = new BehaviorSubject<any>(null);
  readonly platformManageSupplierAccountView$ = new BehaviorSubject<any>(null);
  SupplierAccountList(data: IAccountList) {
    console.log(data);

    from(request(platformManageApi.PlatformManageSupplierList(data))).subscribe(
      (data) => {
        if (data) {
          this.platformManageSupplierList$.next(data);
        }
      }
    );
  }

  SupplierInfo(type: string) {
    from(request(platformManageApi.PlatformManageSupplierInfo(type))).subscribe(
      (data) => {
        if (data) {
          this.platformManangeSupplierInfo$.next(data);
        }
      }
    );
  }

  viewSupplierAccount(uid: string) {
    if (uid !== "") {
      from(
        request(platformManageApi.PlatformManageSupplierAccountView(uid))
      ).subscribe((data) => {
        if (data) {
          this.platformManageSupplierAccountView$.next(data);
        }
      });
    }
  }
}

const platformManage = new PlatformManage();
export default platformManage;

export type IAccountList = {
  keyword?: string;
  name?: string;
  supplier?: string;
  type?: string;
  searchPage?: SearchPage;
};

export type SearchPage = {
  desc?: number;
  page?: number;
  pageSize?: number;
  sort?: string;
};
