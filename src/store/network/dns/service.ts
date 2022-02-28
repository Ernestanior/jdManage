import { BehaviorSubject, from } from "rxjs";
import request from "@/store/request";
import { dnsApi } from "@/store/api";
import {
  ISearchDomain,
  IDomainList,
  IDnsDomain,
  ISearchDnsCname,
  IDnsCname,
  IDomainLine,
  IBatchRecords,
  IBatchRecordsResult,
  IValidateCName,
  IValidateCNameResult,
  IDomainCount,
} from "./interface";
import _ from "underscore";
import { findNestedObj } from "@/common/utils/util";

/**
 * 用户相关功能
 */
class Dns {
  readonly domainList$ = new BehaviorSubject<IDomainList | null>(null);
  readonly dnsDomainList$ = new BehaviorSubject<IDomainList | null>(null);
  readonly dnsCnameList$ = new BehaviorSubject<IDnsCname[] | null>(null);
  readonly customerLineList$ = new BehaviorSubject<IDomainLine[] | null>(null);
  public createBatchRecordsResult$: IBatchRecordsResult[] = [];
  readonly cNameValidatedResult$ =
    new BehaviorSubject<IValidateCNameResult | null>(null);
  readonly domainCountList$ = new BehaviorSubject<IDomainCount | null>(null);

  // readonly createBatchRecordsResult$ = new BehaviorSubject<IBatchRecordsResult[] | null>(null);

  readonly recordLoading = new BehaviorSubject<boolean | null>(null);

  findDomain(data: ISearchDomain) {
    from(request(dnsApi.FindDomain(data))).subscribe((data) => {
      if (data) {
        this.domainList$.next(data);
      }
    });
  }
  findDnsDomain(data: IDnsDomain) {
    from(request(dnsApi.FindDnsDomain(data))).subscribe((data) => {
      if (data) {
        this.dnsDomainList$.next(data);
      }
    });
  }
  findDnsCnameList(data: ISearchDnsCname) {
    from(request(dnsApi.FindDnsCnameList(data))).subscribe((data) => {
      if (data) {
        this.dnsCnameList$.next(data);
      }
    });
  }
  createBatchRecords(data: IBatchRecords, customerLines: any) {
    this.recordLoading.next(true);
    return request(dnsApi.CreateBatchRecords(data)).then((res) => {
      const successCreatedBatchRecords = data.records.map((r: any) => ({
        domain: r.domain,
        name: r.name,
        value: r.value,
        success: true,
      }));
      this.createBatchRecordsResult$ = _.unique(
        [...this.createBatchRecordsResult$, ...successCreatedBatchRecords],
        (r) => [r.domain, r.name, r.value].join()
      );

      if (res && res.messages.length) {
        const errorMsgs: string[] = [];
        const warningMsgs: string[] = [];

        res.messages.forEach((msg: any) => {
          const { errors, record, warnings } = msg;
          const { domain, name, type, line, value, weight, ttl } = record; //域名、主机记录、记录类型、线路、记录值、权重、TTL
          let selectedLine = { name: "默认" };

          if (line && customerLines) {
            const lineObj = findNestedObj(customerLines, "uid", line.uid);
            if (lineObj) selectedLine = lineObj;
          }
          const currentRecord = this.createBatchRecordsResult$.find(
            (r) => r.domain === domain && r.name && name && r.value === value
          );
          if (errors) {
            const error = errors[0];
            const errMsg = `${domain} ${name} ${type} ${
              selectedLine.name || ""
            } ${value} ${weight} ${ttl} - ${error}`;
            errorMsgs.push(errMsg);
            if (currentRecord) {
              currentRecord.success = false;
              currentRecord.errMsg = errMsg;
            }
            return errMsg;
          } else {
            const warn = warnings[0];
            const warnMsg = `${domain} ${name} ${type} ${
              selectedLine.name || ""
            } ${value} ${weight} ${ttl} - ${warn}`;
            warningMsgs.push(warnMsg);
            if (currentRecord) {
              currentRecord.warnMsg = warnMsg;
            }
            return warnMsg;
          }
        });
        this.recordLoading.next(false);
        return { errors: errorMsgs, warnings: warningMsgs };
      } else {
        this.recordLoading.next(false);
        return "no error";
      }
    });
  }
  findCustomerLineList() {
    from(request(dnsApi.FindCustomerLineList())).subscribe((data) => {
      if (data) {
        this.customerLineList$.next(data);
      }
    });
  }
  validateCName(data: IValidateCName) {
    from(request(dnsApi.ValidateCName(data))).subscribe((data) => {
      if (data) {
        this.cNameValidatedResult$.next(data);
      }
    });
  }
  findDomainCount(customerUid: string) {
    from(request(dnsApi.FindDomainCount(customerUid))).subscribe((data) => {
      if (data) {
        this.domainCountList$.next(data);
      }
    });
  }
}

const dnsService = new Dns();

export default dnsService;
