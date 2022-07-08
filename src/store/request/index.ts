import RequestPlx from "@/common/tools/request";
import { getUser } from "@/store/storage";
import { AxiosRequestConfig } from "axios";
import { notification } from "antd";
// import { Base64 } from "js-base64";
import { loading } from "@/components/loading";
import { IUserInfo } from "../network/account/interface";

const requestPlx = new RequestPlx();

export const dev_url = "https://api.reviewonclass.com";
export const img_url = "https://pic.reviewonclass.com/static/image";
// add dev server url
requestPlx.middleware_before.use(async (config, next) => {
  config.url = dev_url + config.url;
  await next();
});

// header add token
requestPlx.middleware_before.use(async (config, next) => {
  const userInfo: IUserInfo = getUser();
  if (userInfo && userInfo.token) {
    config.headers["AUTH"] = userInfo.token;
  }
  loading.loading$.next(true);
  await next();
});

// analysis response status
requestPlx.middleware_after.use(async (rep: any, next) => {
  if (rep.status) {
    if (rep.status !== 200) {
      notification.error({
        message: rep.status,
        description: rep.statusText,
      });
      rep.data = null;
    }
  } else {
    notification.error({
      message: rep.message,
    });
    rep.data = null;
  }
  await next();
});

requestPlx.middleware_after.use(async (rep, next) => {
  if (rep.data) {
    if (rep.data.code !== 200) {
      notification.error({
        message: "有点小问题",
      });
    }
  }
  loading.loading$.next(false);
  await next();
});

async function request(config: AxiosRequestConfig) {
  const rep = await requestPlx.request(config);
  return rep.data;
}

export default request;
