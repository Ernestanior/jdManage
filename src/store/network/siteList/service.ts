import { BehaviorSubject, from } from "rxjs";
import request from "@/store/request";
import { sitelistApi } from "@/store/api";
import { ISearchParamsSite, ISiteList} from "./interface";

/**
 * 用户相关功能
 */
class SiteList {
    readonly siteList$ = new BehaviorSubject<ISiteList | null>(null);

    findSiteList(data: ISearchParamsSite) {
        from(request(sitelistApi.FindSiteList(data)))
        .subscribe(data => {
            if (data) {
                this.siteList$.next(data)
            }
        })
    }
    // create(params: ICreateUserParams) {
    //     from(request(userApi.CreateUser({
    //         ...params
    //     }, {}))
    //     ).subscribe(data => {
    //         if (data) {
    //             this.userList$.next(data)
    //         }
    //     }
    //     )
    // }
}

const sitelistService = new SiteList();

export default sitelistService;