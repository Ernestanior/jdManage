import request from "@/store/request";
import { BehaviorSubject, from } from "rxjs";
import { dnsManageApi } from "../../api";

class DnsManage {
  readonly dnsManageCustomerList$ = new BehaviorSubject<any>(null);
  readonly dnsManageDomainList$ = new BehaviorSubject<any>(null);
  readonly dnsManageRecordList$ = new BehaviorSubject<any>(null);
  readonly dnsManageCertList$ = new BehaviorSubject<any>(null);

  customerList(data: {}) {
    from(request(dnsManageApi.DnsCustomerList(data))).subscribe((data) => {
      if (data) {
        this.dnsManageCustomerList$.next(data);
      }
    });
  }

  domainList(data: {}) {
    from(request(dnsManageApi.DnsDomainList(data))).subscribe((data) => {
      if (data) {
        this.dnsManageDomainList$.next(data);
      }
    });
  }

  recordList(data: {}) {
    from(request(dnsManageApi.DnsRecordList(data))).subscribe((data) => {
      if (data) {
        this.dnsManageRecordList$.next(data);
      }
    });
  }

  certList(data: {}) {
    from(request(dnsManageApi.DnsCertList(data))).subscribe((data) => {
      if (data) {
        this.dnsManageCertList$.next(data);
      }
    });
  }
}

const dnsManage = new DnsManage();
export default dnsManage;
