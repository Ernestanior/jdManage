import { AxiosRequestConfig, AxiosResponse, default as axios } from "axios";
import Middleware from "../middleware";

class RequestPlx<T = any> {
  middleware_before = new Middleware<AxiosRequestConfig>();
  middleware_after = new Middleware<AxiosResponse<T>>();

  async request(config: AxiosRequestConfig) {
    try {
      // 预处理
      await this.middleware_before.apply(config);
      // 网络请求
      const response = await axios.request(config);
      // 请求结果解析
      await this.middleware_after.apply(response);
      return response;
    } catch (err: any) {
      await this.middleware_after.apply(err);
      return err as any;
    }
  }
}

export default RequestPlx;
