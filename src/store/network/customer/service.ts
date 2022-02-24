import { BehaviorSubject, from } from "rxjs";
import request from "@/store/request";
import { customerApi } from "@/store/api";

/**
 * 用户相关功能
 */
class Customer {
  readonly CustomerList$ = new BehaviorSubject<any>(null);

  CustomerList(data: any) {
    from(request(customerApi.CustomerList({}, data))).subscribe((data) => {
      if (data) {
        this.CustomerList$.next(data);
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
