import { BehaviorSubject, from } from "rxjs";
import request from "@/store/request";
import { customerApi } from "@/store/api";
import { ISearchCustomer, ICustomerList } from "./interface";

/**
 * 用户相关功能
 */
class Customer {
  readonly customerList$ = new BehaviorSubject<ICustomerList | null>(null);
  readonly createCustomer$ = new BehaviorSubject<any>(null);
  readonly deleteCustomer$ = new BehaviorSubject<any>(null);
  readonly motifyCustomer$ = new BehaviorSubject<any>(null);
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

  deleteCustomer( data : any) {
    from(request(customerApi.DeleteCustomer(data))).subscribe((data)=>{
      if (data) {
        this.deleteCustomer$.next(data);
      }
    })
  }

  modifyCustomer(data: any){
    from(request(customerApi.ModifyCustomer(data))).subscribe((data)=>{
      if (data) {
        this.motifyCustomer$.next(data);
        
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

const CustomerService = new Customer();

export default CustomerService;
