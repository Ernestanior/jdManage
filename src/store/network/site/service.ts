import { notification } from "antd";
import { BehaviorSubject, from } from "rxjs";
import request from "@/store/request";
import { siteApi } from "@/store/api";
import { ICreateSite, ISearchParamsSite, ISiteList } from "./interface";

/**
 * 用户相关功能
 */
class Site {
  readonly siteList$ = new BehaviorSubject<ISiteList | null>(null);
  readonly siteAllList$ = new BehaviorSubject<any[] | null>(null);
  readonly siteInfo$ = new BehaviorSubject<any>(null);

  /**
   * 条件查询site
   */
  findSite(data: ISearchParamsSite) {
    from(request(siteApi.FindSite(data))).subscribe((data) => {
      if (data) {
        this.siteList$.next(data);
      }
    });
  }
  /**
   * 条件查询site
   */
  findSiteAll() {
    from(request(siteApi.FindSiteAll())).subscribe((data) => {
      if (data) {
        this.siteAllList$.next(data);
      }
    });
  }
  getSiteInfo(uid: string) {
    from(request(siteApi.GetSiteInfo(uid))).subscribe((data) => {
      if (data) {
        this.siteInfo$.next(data);
      }
    });
  }

  // create(params: ICreateUserParams) {
  //     from(request(userApi.CreateUser({
  //         ...params
  //     }, {}))
  //     ).subscribe(data => {
  //         if (data) {
  //             this..next(data)
  //         }

  // createSite(data: ICreateSite) {
  //   from(request(siteApi.CreateSite(data))).subscribe((data) => {
  //     if (data) {
  //       notification.success({
  //         message: "Create Success",
  //       });

  //     }
  //   });
  // }
  // deleteSite(data: string[]) {
  //   from(request(siteApi.DeleteSite(data))).subscribe((data) => {
  //     if (data) {
  //       notification.success({
  //         message: "Delete Success",
  //       });
  //     }
  //   });
  // }
}

const siteService = new Site();

export default siteService;
