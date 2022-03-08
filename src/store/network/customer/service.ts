import { BehaviorSubject, from } from "rxjs";
import request from "@/store/request";
import { customerApi } from "@/store/api";
import { ISearchCustomer } from "./interface";

/**
 * 用户相关功能
 */
class Customer {
  readonly customerList$ = new BehaviorSubject<any>(null);

  findCustomer(data: ISearchCustomer) {
    from(request(customerApi.FindCustomer(data))).subscribe((data) => {
      if (data) {
        this.customerList$.next(data);
      }
    });
  }
}

const customerService = new Customer();

export default customerService;
