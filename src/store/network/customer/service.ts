import { BehaviorSubject, from } from "rxjs";
import request from "@/store/request";
import { customerApi } from "@/store/api";
import {
  ISearchCustomer,
  ICustomerList,
  IDefenceQuota,
  IServiceDomain,
} from "./interface";

/**
 * 用户相关功能
 */
class Customer {
  readonly createCustomer$ = new BehaviorSubject<any>(null);
  readonly deleteCustomer$ = new BehaviorSubject<any>(null);
  readonly motifyCustomer$ = new BehaviorSubject<any>(null);
  readonly customerList$ = new BehaviorSubject<any>(null);
  readonly defenceQuotaList$ = new BehaviorSubject<IDefenceQuota[] | null>(
    null
  );
  readonly serviceDomainList$ = new BehaviorSubject<IServiceDomain[] | null>(
    null
  );

  findCustomer(data: ISearchCustomer) {
    from(request(customerApi.FindCustomer(data))).subscribe((data) => {
      if (data) {
        this.customerList$.next(data);
      }
    });
  }

  createCustomer(data: any) {
    from(request(customerApi.CreateCustomer(data))).subscribe((data) => {
      if (data) {
        this.createCustomer$.next(data);
      }
    });
  }

  deleteCustomer(data: any) {
    from(request(customerApi.DeleteCustomer(data))).subscribe((data) => {
      if (data) {
        this.deleteCustomer$.next(data);
      }
    });
  }

  modifyCustomer(data: any) {
    from(request(customerApi.ModifyCustomer(data))).subscribe((data) => {
      if (data) {
        this.motifyCustomer$.next(data);
      }
    });
  }
  findDefenceQuota() {
    from(request(customerApi.FindDefenceQuota())).subscribe((data) => {
      if (data) {
        this.defenceQuotaList$.next(data.options);
      }
    });
  }
  findServiceDomain() {
    from(request(customerApi.FindServiceDomain())).subscribe((data) => {
      if (data) {
        this.serviceDomainList$.next(data.content);
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

const customerService = new Customer();

export default customerService;
