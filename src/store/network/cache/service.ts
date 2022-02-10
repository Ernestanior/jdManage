import { notification } from "antd";
import { BehaviorSubject, from } from "rxjs";
import request from "@/store/request";
import { cacheApi } from "@/store/api";
import { CacheSetting } from "./interface";

/**
 * 用户相关功能
 */
class Cache {
  readonly cacheSetting$ = new BehaviorSubject<CacheSetting | null>(null);
  findCacheSetting(uid: string) {
    from(request(cacheApi.FindCacheSetting(uid))).subscribe((data) => {
      if (data) {
        this.cacheSetting$.next(data);
      }
    });
  }
  clearAllCache(uid: string) {
    from(request(cacheApi.ClearAllCache(uid))).subscribe((data) => {
      if (data instanceof Object) {
        notification.success({
          message: "Clear Success",
        });
      }
    });
  }
}

const cacheService = new Cache();

export default cacheService;
