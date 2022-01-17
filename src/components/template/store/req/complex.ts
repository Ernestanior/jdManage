import req from "./index";
import { AxiosRequestConfig } from "axios";
import { INotificationModule } from "../../interface";

const reqServicePlx = async <T>(
  config: AxiosRequestConfig & INotificationModule,
  needLogin = true
) => {
  try {
    const res = await req<T>(config, needLogin);
    return {
      isSuccess: true,
      result: res,
      message: "",
    };
  } catch (error: any) {
    let message = "";
    if (error.data) {
      message = error.data.msg || "";
    }
    return {
      isSuccess: false,
      result: null,
      message,
    };
  }
};

export default reqServicePlx;
