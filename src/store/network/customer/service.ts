import { BehaviorSubject, from } from "rxjs";
import request from "@/store/request";
import { customerApi } from "@/store/api";
import { ISearchCustomer, ICustomerList } from "./interface";

/**
 * 用户相关功能
 */
class Customer {
  readonly customerList$ = new BehaviorSubject<ICustomerList | null>(null);

  findCustomer(data: ISearchCustomer) {
    from(request(customerApi.FindCustomer(data))).subscribe((data) => {
      if (data) {
        this.customerList$.next(data);
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
