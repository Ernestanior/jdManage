import { BehaviorSubject, from } from "rxjs";
import request from "@/store/request";
import { dnsApi } from "@/store/api";
import { ISearchDomain, IDomainList } from "./interface";

/**
 * 用户相关功能
 */
class Dns {
  readonly domainList$ = new BehaviorSubject<IDomainList | null>(null);

  findDomain(data: ISearchDomain) {
    from(request(dnsApi.FindDomain(data))).subscribe((data) => {
      if (data) {
        this.domainList$.next(data);
      }
    });
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

const DnsService = new Dns();

export default DnsService;
