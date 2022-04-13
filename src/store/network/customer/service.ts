import { BehaviorSubject, from } from "rxjs";
import request from "@/store/request";
import { companyApi } from "@/store/api";
import { ISearchCustomer } from "./interface";

/**
 * 用户相关功能
 */
class Customer {
  readonly customerList$ = new BehaviorSubject<any>(null);
}

const customerService = new Customer();

export default customerService;
