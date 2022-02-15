import request from "@/store/request";
import { BehaviorSubject, from } from "rxjs";
import { dnsManageApi, infoInquiryApi, platformManageApi } from "../../api";

class InfoInquiry {
  readonly infoInquirySite$ = new BehaviorSubject<any>(null);
  readonly infoInquiryCustomerList$ = new BehaviorSubject<any>(null);
  readonly infoInquiryDomainList$ = new BehaviorSubject<any>(null);
  customerList(data: {}) {
    from(request(infoInquiryApi.customerList(data))).subscribe((data) => {
      if (data) {
        console.log(data, "data");
        this.infoInquiryCustomerList$.next(data);
      }
    });
  }
  domainList(data: {}) {
    from(request(infoInquiryApi.domainList(data))).subscribe((data) => {
      if (data) {
        console.log(data, "data");
        this.infoInquiryDomainList$.next(data);
      }
    });
  }

  site() {
    from(request(infoInquiryApi.Site())).subscribe((data) => {
      if (data) {
        this.infoInquirySite$.next(data);
      }
    });
  }
}

const infoInquiry = new InfoInquiry();
export default infoInquiry;
