import { AxiosRequestConfig } from "axios";

class SupplierAPI {
  /**
   * findSupplier
   * 生成请求参数
   */
  FindSupplier = () => {
    const config: AxiosRequestConfig = {
      url: "/supplier/list",
      method: "post",
      data: { uid: "c1846591-9205-11eb-af25-00163e02f99f" },
    };
    config.headers = {};
    return config;
  };
}
export default SupplierAPI;
