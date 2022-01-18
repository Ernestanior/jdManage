import { ToCDB, upperCasePlx } from "../../utils";
import axios, { AxiosRequestConfig } from "axios";
// import accountService from "@/store/account/service";
import tool from "../tools";
import affairService from "./affairs";
import { IResponseBody, INotificationModule } from "../../interface";
import resolveReq from "./resolve";

const httpConfig: AxiosRequestConfig = {
  timeout: 60000,
  withCredentials: true,
  baseURL: "/v3/api",
};

if (process.env.NODE_ENV === "development") {
  httpConfig.baseURL = "http://localhost:10087/v3/api";
}

const httpAxios = axios.create(httpConfig);

const log = tool.createDebug(true, "网络请求");

/**
 * 网络请求服务
 * @param config
 * @param needLogin
 */
const reqService = <T>(
  config: AxiosRequestConfig & INotificationModule,
  needLogin = true
) => {
  const tarConfig = { ...config };
  // 将操作成功提示从往后端的提示中删除
  delete tarConfig.__message;
  // const token = accountService.token$.value;
  // if (needLogin && token) {
  //   tarConfig.headers["greycdn-token"] = token;
  // }
  const methodType = config.method && (upperCasePlx(config.method) as any);
  if (config.method && ["DELETE", "PUT"].includes(methodType)) {
    if (config.url) {
      // 如果有操作结果配置
      if (!!config.__message) {
        if (!config.__message.disable) {
          affairService.addEvent(
            config.url,
            config.method.toLowerCase(),
            config.__message.successInfo
          );
        }
      } else {
        affairService.addEvent(config.url, config.method.toLowerCase());
      }
    }
    // PUT请求，全角转半角, 需要注意如果是导入文件，不能经过此处理
    if (methodType === "PUT" && tarConfig.data) {
      if (!(tarConfig.data instanceof FormData)) {
        tarConfig.data = ToCDB(tarConfig.data);
      }
    }
  }
  return new Promise<T | null>((resolve, reject) => {
    httpAxios
      .request<IResponseBody<T>>(tarConfig)
      .then((res) => {
        if (res.status === 200) {
          const rep = resolveReq<T>(res);
          if (rep.success) {
            // 提示请求结果
            if (rep.success) {
              if (
                config.method &&
                ["DELETE", "PUT"].includes(upperCasePlx(config.method) as any)
              ) {
                // 如果有操作结果配置
                if (config.url) {
                  if (!!config.__message) {
                    if (!config.__message.disable) {
                      affairService.removeEvent(
                        config.url,
                        config.method.toLowerCase()
                      );
                    }
                  } else {
                    affairService.removeEvent(
                      config.url,
                      config.method.toLowerCase()
                    );
                  }
                }
              }
            } else {
              // 请求失败
              if (
                config.method &&
                ["DELETE", "PUT"].includes(upperCasePlx(config.method) as any)
              ) {
                affairService.setErrorPool();
              }
            }
            resolve(rep.data);
          } else {
            // 请求失败
            if (
              config.method &&
              ["DELETE", "PUT"].includes(upperCasePlx(config.method) as any)
            ) {
              affairService.setErrorPool();
            }
            reject(res);
          }
        }
        resolve(null);
      })
      .catch((err) => {
        if (err.response) {
          const rep = resolveReq<T>(err.response);
          // 请求失败
          if (
            config.method &&
            ["DELETE", "PUT"].includes(upperCasePlx(config.method) as any)
          ) {
            affairService.setErrorPool();
          }
          if (rep.success) {
            resolve(rep.data);
          } else {
            reject(err);
          }
        } else {
          log("网络请求无响应, 请求参数如下:", tarConfig);
          reject(err);
        }
      })
      .finally(() => {
        reject(null);
      });
  });
};

export default reqService;
