import request from "@/store/request";
import { BehaviorSubject, from } from "rxjs";
import { dnsManageApi, platformManageApi } from "../../api";

class DnsManage {
  readonly dnsManageCustomerList$ = new BehaviorSubject<any>(null);
  readonly dnsManageDomainList$ = new BehaviorSubject<any>(null);
  readonly dnsManageRecordList$ = new BehaviorSubject<any>(null);
  customerList(data: {}) {
    from(request(dnsManageApi.DnsCustomerList(data))).subscribe((data) => {
      if (data) {
        console.log(data, "data");
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
}

const dnsManage = new DnsManage();
export default dnsManage;
