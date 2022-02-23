import request from "@/store/request";
import { BehaviorSubject, from } from "rxjs";
import { sslManageApi } from "../../api";

class SslManage {
  readonly sslCustomerList$ = new BehaviorSubject<any>(null);
  readonly sslCertList$ = new BehaviorSubject<any>(null);
  readonly sslOriginCertList$ = new BehaviorSubject<any>(null);
  readonly sslViewCert$ = new BehaviorSubject<any>(null);
  readonly sslViewOriginCert$ = new BehaviorSubject<any>(null);
  customerList(data: {}) {
    from(request(sslManageApi.customerList(data))).subscribe((data) => {
      if (data) {
        this.sslCustomerList$.next(data);
      }
    });
  }

  certList(data: {}) {
    from(request(sslManageApi.certList(data))).subscribe((data) => {
      if (data) {
        this.sslCertList$.next(data);
      }
    });
  }

  originCertList(data: {}) {
    from(request(sslManageApi.originCertList(data))).subscribe((data) => {
      if (data) {
        this.sslOriginCertList$.next(data);
      }
    });
  }

  viewCert(data: string) {
    if (data !== "") {
      from(request(sslManageApi.viewCert({ data }))).subscribe((data) => {
        if (data) {
          this.sslViewCert$.next(data);
        }
      });
    }
  }

  viewOriginCert(data: string) {
    if (data !== "") {
      from(request(sslManageApi.viewOriginCert({ data }))).subscribe((data) => {
        if (data) {
          this.sslViewOriginCert$.next(data);
        }
      });
    }
  }
}

const sslManage = new SslManage();
export default sslManage;
