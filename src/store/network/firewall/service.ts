import { BehaviorSubject, from } from "rxjs";
import request from "@/store/request";
import { firewallApi } from "@/store/api";
import { FirewallList } from "./interface";

/**
 * 用户相关功能
 */
class Firewall {
  readonly whiteIP$ = new BehaviorSubject<FirewallList | null>(null);
  readonly blackIP$ = new BehaviorSubject<FirewallList | null>(null);
  readonly whiteUA$ = new BehaviorSubject<FirewallList | null>(null);
  readonly blackUA$ = new BehaviorSubject<FirewallList | null>(null);

  findWhiteIP(uid: string) {
    from(request(firewallApi.FindWhiteIP(uid))).subscribe((data) => {
      if (data) {
        this.whiteIP$.next(data);
      }
    });
  }
  findBlackIP(uid: string) {
    from(request(firewallApi.FindBlackIP(uid))).subscribe((data) => {
      if (data) {
        this.blackIP$.next(data);
      }
    });
  }
  findWhiteUA(uid: string) {
    from(request(firewallApi.FindWhiteUA(uid))).subscribe((data) => {
      if (data) {
        this.whiteUA$.next(data);
      }
    });
  }
  findBlackUA(uid: string) {
    from(request(firewallApi.FindBlackUA(uid))).subscribe((data) => {
      if (data) {
        this.blackUA$.next(data);
      }
    });
  }
}

const firewallService = new Firewall();

export default firewallService;
