import { BehaviorSubject, from } from "rxjs";
import request from "@/store/request";
import { statApi } from "@/store/api";
import {
  IStatSiteAvail,
  IStatSiteBandwidth,
  IStatSiteOrigin,
  IStatSiteSupplier,
  IStatSupplierAvail,
} from "./interface";

/**
 * 用户相关功能
 */
class Stat {
  readonly statSiteSupplierList$ = new BehaviorSubject<any | null>(null);
  readonly statSiteBandwidthList$ = new BehaviorSubject<any | null>(null);
  readonly statSiteFlowList$ = new BehaviorSubject<any | null>(null);
  readonly statSiteAvailList$ = new BehaviorSubject<any | null>(null);
  readonly statSiteResTimeList$ = new BehaviorSubject<any | null>(null);
  readonly statSiteOriginList$ = new BehaviorSubject<any | null>(null);
  readonly statSupplierAvailList$ = new BehaviorSubject<any | null>(null);
  readonly statSupplierResTimeList$ = new BehaviorSubject<any | null>(null);

  statSiteSupplier(data: IStatSiteSupplier) {
    from(request(statApi.StatSiteSupplier(data))).subscribe((data) => {
      if (data) {
        this.statSiteSupplierList$.next(data);
      }
    });
  }
  statSiteBandwidth(uid: string, data: IStatSiteBandwidth) {
    from(request(statApi.StatSiteBandwidth(uid, data))).subscribe((data) => {
      if (data) {
        this.statSiteBandwidthList$.next(data);
      }
    });
  }
  statSiteFlow(uid: string, data: IStatSiteBandwidth) {
    from(request(statApi.StatSiteFlow(uid, data))).subscribe((data) => {
      if (data) {
        this.statSiteFlowList$.next(data);
      }
    });
  }
  statSiteAvail(uid: string, data: IStatSiteAvail) {
    from(request(statApi.StatSiteAvail(uid, data))).subscribe((data) => {
      if (data) {
        this.statSiteAvailList$.next(data);
      }
    });
  }
  statSiteResTime(uid: string, data: IStatSiteAvail) {
    from(request(statApi.StatSiteResTime(uid, data))).subscribe((data) => {
      if (data) {
        this.statSiteResTimeList$.next(data);
      }
    });
  }
  statSiteOrigin(uid: string, data: IStatSiteOrigin) {
    from(request(statApi.StatSiteOrigin(uid, data))).subscribe((data) => {
      if (data) {
        this.statSiteOriginList$.next(data);
      }
    });
  }
  statSupplierAvail(uid: string, data: IStatSupplierAvail) {
    from(request(statApi.StatSupplierAvail(uid, data))).subscribe((data) => {
      if (data) {
        this.statSupplierAvailList$.next(data);
      }
    });
  }
  statSupplierResTime(uid: string, data: IStatSupplierAvail) {
    from(request(statApi.StatSupplierResTime(uid, data))).subscribe((data) => {
      if (data) {
        this.statSupplierResTimeList$.next(data);
      }
    });
  }
}

const statService = new Stat();

export default statService;
