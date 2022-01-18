import { ToCDB, upperCasePlx } from "../../utils";
import axios, { AxiosRequestConfig } from "axios";
// import accountService from "@/store/account/service";
import tool from "../tools";
import { IResponseBody } from "../../interface";
import resolveReq from "./resolve";

const httpConfig: AxiosRequestConfig = {
  withCredentials: true,
  baseURL: "/v3/api",
};

if (process.env.NODE_ENV === "development") {
  httpConfig.baseURL = "http://localhost:10087/v3/api";
}

const httpAxios = axios.create(httpConfig);

const log = tool.createDebug(true, "无超时中断网络请求");

// /**
//  * 网络请求服务
//  * @param config
//  */
// const reqServiceWithOutTimeLimit = <T>(
//     config: AxiosRequestConfig,
// ) => {
//     const tarConfig = { ...config };
//     // 将操作成功提示从往后端的提示中删除
//     const token = accountService.token$.value;
//     if (token) {
//         tarConfig.headers["greycdn-token"] = token;
//     }
//     const methodType = config.method && (upperCasePlx(config.method) as any);
//     if (config.method && ["DELETE", "PUT"].includes(methodType)) {
//         // PUT请求，全角转半角, 需要注意如果是导入文件，不能经过此处理
//         if (methodType === "PUT" && tarConfig.data) {
//             if(!(tarConfig.data instanceof FormData)){
//                 tarConfig.data = ToCDB(tarConfig.data);
//             }
//         }
//     }
//     return new Promise<T | null>((resolve, reject) => {
//         httpAxios
//             .request<IResponseBody<T>>(tarConfig)
//             .then((res) => {
//                 if (res.status === 200) {
//                     const rep = resolveReq<T>(res);
//                     if (rep.success) {
//                         resolve(rep.data);
//                     } else {
//                         reject(res);
//                     }
//                 }
//                 resolve(null);
//             })
//             .catch((err) => {
//                 if (err.response) {
//                     const rep = resolveReq<T>(err.response);
//                     if (rep.success) {
//                         resolve(rep.data);
//                     } else {
//                         reject(err);
//                     }
//                 } else {
//                     log("网络请求无响应, 请求参数如下:", tarConfig);
//                     reject(err);
//                 }
//             })
//             .finally(() => {
//                 reject(null);
//             });
//     });
// };

// const reqServiceWithOutTimeLimitPlx = async <T>(config: AxiosRequestConfig) => {
//     try {
//         const res = await reqServiceWithOutTimeLimit<T>(config);
//         return {
//             isSuccess: true,
//             result: res,
//             message: "",
//         };
//     } catch (error) {
//         let message = "";
//         if(error.data){
//             message = error.data.msg || ""
//         }
//         return {
//             isSuccess: false,
//             result: null,
//             message
//         };
//     }
// }

// export default reqServiceWithOutTimeLimitPlx;
