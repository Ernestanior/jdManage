import { AxiosRequestConfig } from "axios";
import { ISearchCustomer } from "@/store/network/customer/interface";

class CustomerAPI {
  /**
   * findDomain
   * 生成请求参数
   */
  FindCustomer = (data: ISearchCustomer) => {
    const config: AxiosRequestConfig = {
      url: "/customer/list",
      method: "post",
      data,
    };
    config.headers = {};
    return config;
  };
}
export default CustomerAPI;
