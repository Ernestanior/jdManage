import request from "@/store/request";
import { BehaviorSubject, from } from "rxjs";
import { sslManageApi } from "../../api";

class SslManage {
  readonly sslCertList$ = new BehaviorSubject<any>(null);
  readonly sslOriginCertList$ = new BehaviorSubject<any>(null);
  readonly sslViewCert$ = new BehaviorSubject<any>(null);
  readonly sslViewOriginCert$ = new BehaviorSubject<any>(null);

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

  viewCert(uid: string) {
    from(request(sslManageApi.viewCert(uid))).subscribe((data) => {
      if (data) {
        this.sslViewCert$.next(data);
      }
    });
  }

  viewOriginCert(uid: string) {
    from(request(sslManageApi.viewOriginCert(uid))).subscribe((data) => {
      if (data) {
        this.sslViewOriginCert$.next(data);
      }
    });
  }
}

const sslManage = new SslManage();
export default sslManage;
