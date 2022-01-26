import RequestPlx from "@/common/tools/request";
import { getToken } from "@/store/storage";
import { AxiosRequestConfig } from "axios";
import { notification } from "antd";
import { Base64 } from "js-base64";
import accountService from "../network/account/service";
import { loading } from "@/components/loading";

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
    const strs = token.split("=")[1];
    config.headers["Authorization"] = "Basic " + Base64.encode(strs);
  }
  loading.loading$.next(true);
  await next();
});

// analysis response status
requestPlx.middleware_after.use(async (rep, next) => {
  if (rep.status !== 200) {
    notification.error({
      message: rep.status,
      description: rep.statusText,
    });
    rep.data = null;
  }
  await next();
});

requestPlx.middleware_after.use(async (rep, next) => {
  if (rep.data) {
    if (rep.data.response !== "success") {
      notification.error({
        message: rep.data.response,
        description: rep.data.message,
      });
      if (rep.data.response === "ERROR0001") {
        accountService.logout();
      }
    }
    rep.data = rep.data.result;
  }
  loading.loading$.next(false);
  await next();
});

async function request(config: AxiosRequestConfig) {
  const rep = await requestPlx.request(config);
  // console.log(rep.data);

  return rep.data;
}

export default request;
