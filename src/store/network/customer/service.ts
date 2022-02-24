import { BehaviorSubject, from } from "rxjs";
import request from "@/store/request";
import { customerApi } from "@/store/api";
import { ISearchCustomer, ICustomerList } from "./interface";

/**
 * 用户相关功能
 */
class Customer {
  readonly createCustomer$ = new BehaviorSubject<any>(null);
  readonly deleteCustomer$ = new BehaviorSubject<any>(null);
  readonly motifyCustomer$ = new BehaviorSubject<any>(null);
  readonly CustomerList$ = new BehaviorSubject<any>(null);
  readonly resetCustomerPassword$ = new BehaviorSubject<any>(null);
  readonly disableCustomer$ = new BehaviorSubject<any>(null);
  readonly enableCustomer$ = new BehaviorSubject<any>(null);

  CustomerList(data: any) {
    from(request(customerApi.CustomerList({}, data))).subscribe((data) => {
      if (data) {
        this.CustomerList$.next(data);
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

  resetCustomerPassword(params: any, data: any) {
    from(request(customerApi.ResetPassword(params, data))).subscribe((data) => {
      if (data) {
        this.resetCustomerPassword$.next(data);
      }
    });
  }

  disableCustomer(data: any) {
    from(request(customerApi.Disable(data))).subscribe((data) => {
      if (data) {
        this.disableCustomer$.next(data);
      }
    });
  }

  enableCustomer(data: any) {
    from(request(customerApi.Enable(data))).subscribe((data) => {
      if (data) {
        this.enableCustomer$.next(data);
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

const CustomerService = new Customer();

export default CustomerService;
