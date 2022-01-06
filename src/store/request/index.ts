import RequestPlx from "@/common/tools/request";
import { getToken } from "@/store/request/token";
import { AxiosRequestConfig } from "axios";
import { notification } from "antd";
import accountService from "../account/service";

const requestPlx = new RequestPlx();

const dev_url = "http://localhost:10088/tproj";
// const dev_url = "http://47.242.9.183:10087";

// add dev server url
requestPlx.middleware_before.use(async (config, next) => {
  if (process.env.NODE_ENV === "development") {
    config.url = dev_url + config.url;
  } else {
    config.url = "/tproj" + config.url;
  }
  await next();
});

// header add token
requestPlx.middleware_before.use(async (config, next) => {
  const token = getToken();
  if (token) {
    // config.headers["token"] = token;
    config.headers["Authorization"] = "Basic " + token;
  }
  await next();
});

// analysis response status
requestPlx.middleware_after.use(async (rep, next) => {
  // console.log(rep);
  if (rep.status !== 200) {
    notification.error({
      message: rep.status,
      description: rep.statusText,
    });
    if (rep.status === 401) {
      accountService.logout();
    }
    rep.data = null;
  }
  await next();
});

// requestPlx.middleware_after.use(async (rep, next) => {
//   if (rep.data) {
//     if (!!rep.data.code && rep.data.code !== 200) {
//       notification.error({
//         message: rep.data.code,
//         description: rep.data.msg,
//       });
//       if (rep.data.code === 401) {
//         accountService.logout();
//       }
//       rep.data = null;
//     } else {
//       rep.data = rep.data.data;
//     }
//   }
//   await next();
// });

async function request(config: AxiosRequestConfig) {
  const rep = await requestPlx.request(config);
  return rep.data;
}

export default request;
