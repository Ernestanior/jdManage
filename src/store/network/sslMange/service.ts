import request from "@/store/request";
import { BehaviorSubject, from } from "rxjs";
import { sslManageApi } from "../../api";

class SslManage {
  readonly sslCustomerList$ = new BehaviorSubject<any>(null);
  readonly sslCertList$ = new BehaviorSubject<any>(null);
  readonly sslOriginCertList$ = new BehaviorSubject<any>(null);
  customerList(data: {}) {
    from(request(sslManageApi.customerList(data))).subscribe((data) => {
      if (data) {
        console.log(data, "data");
        this.sslCustomerList$.next(data);
      }
    });
  }

  certList(data: {}) {
      from(request(sslManageApi.certList(data))).subscribe((data)=>{
          if (data) {
              this.sslCertList$.next(data);
          }
      })
  }

  originCertList(data:{}){
      from(request(sslManageApi.originCertList(data))).subscribe((data)=>{
          if (data) {
              this.sslOriginCertList$.next(data);
          }
      })
  }
}

const sslManage = new SslManage();
export default sslManage;
