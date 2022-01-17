import { notification } from "antd";
import { AxiosResponse } from "axios";
// import accountService from "../account/service";
import tool from "../tools";
import { IResponseBody } from "../../interface";

const log = tool.createDebug(true, "网络请求解析模块");
function resolveReq<T>(rep: AxiosResponse<IResponseBody<T>>) {
  const res = {
    data: null as any,
    success: false,
  };
  if (rep.status === 401) {
    log("登录无效");
    // accountService.removeLoginInfo();
    return res;
  }
  if (rep.status !== 200) {
    log("网络请求失败");
    notification.error({
      message: rep.status,
      description: rep.data.msg || "-",
    });
    return res;
  }
  // 请求成功
  if (rep.data) {
    if (rep.data.msg === "success") {
      res.success = true;
      res.data = rep.data.data;
    } else {
      notification.error({
        message: "网络请求错误",
        description: rep.data.msg || "-",
      });
    }
  } else {
    notification.error({
      message: "网络请求错误",
      description: "-",
    });
  }
  if (!res.success) {
    // 请求失败
    log("请求异常，返回值如下\n", rep.data);
  }
  return res;
}

export default resolveReq;
