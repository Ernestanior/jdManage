import { FC, useEffect, useMemo, useState } from "react";
import {
  useCustomerLineList,
  useDnsCnameList,
  useRecordLoading,
} from "@/store/network/dns";
import dnsService from "@/store/network/dns/service";
import { Btn } from "@/components/button";
import { useSuffix } from "@/store/network/site";
import siteService from "@/store/network/site/service";
import useUid from "@/hooks/useUid";
import { useLoading } from "@/components/loading";
import { useLocation } from "react-router-dom";
import psl from "psl";
import _ from "underscore";
import IconFont from "@/components/icon";
import Tip from "@/components/tip";
import "./index.less";
interface IProps {
  onClose: () => void;
  next: () => void;
  prev: () => void;
}
type IRecord = {
  domain: string;
  name: string;
  value: string;
  isAcme?: boolean | undefined;
};
const CreateDrawer: FC<IProps> = ({ onClose, next, prev }) => {
  const siteUid = useUid();
  const suffix = useSuffix();
  const loading = useLoading();
  const { domains }: any = useLocation().state;
  const recordLoading = useRecordLoading();
  const customerLine = useCustomerLineList();

  const [refresh, setRefresh] = useState(false);
  const acmelist = useDnsCnameList();

  let allRecords: IRecord[] = [];

  useEffect(() => {
    if (!suffix) {
      siteService.getSuffix(siteUid);
    }
  }, []);
  useEffect(() => {
    if (!customerLine) {
      dnsService.findCustomerLineList();
    }
  }, []);

  useEffect(() => {
    setRefresh(!refresh);
  }, [recordLoading]);

  useEffect(() => {
    domains &&
      !!domains.length &&
      dnsService.findDnsCnameList({ domains, siteUid });
  }, [domains]);

  const formattedRecords = useMemo(
    () => getFormattedRecords(domains),
    [domains]
  );
  const keys = useMemo(() => Object.keys(formattedRecords), [formattedRecords]);
  const groupAcme = useMemo(
    () => acmelist && _.groupBy(acmelist, "name"),
    [acmelist]
  );
  const constructRecords = (data: IRecord[] = []) => {
    return data.map((d) => ({
      domain: d.domain,
      name: d.name,
      value: d.value + ".",
      line: customerLine && customerLine.length ? customerLine[0] : null,
      type: "CNAME",
      ttl: 600,
      weight: 1,
    }));
  };
  const addToDns = async (
    data: { domain: string; name: string; value: string },
    isAcme?: boolean
  ) => {
    const records = constructRecords([data]);
    const dataObj = {
      disableRecordsWithSameName: true,
      typesToDisable: isAcme ? ["TXT", "CNAME"] : ["A", "AAAA", "CNAME"],
      records,
    };
    await dnsService.createBatchRecords(dataObj, customerLine);
  };
  const addAllToDns = async () => {
    const normalRecords = allRecords.filter((d: any) => !d.isAcme);
    const acmeRecords = allRecords.filter((d: any) => d.isAcme);

    const normalRecordsData = constructRecords(normalRecords);
    const acmeRecordsData = constructRecords(acmeRecords);

    const normalRecordsDataObj = {
      disableRecordsWithSameName: true,
      typesToDisable: ["A", "AAAA", "CNAME"],
      records: normalRecordsData,
    };

    const acmeRecordsDataObj = {
      disableRecordsWithSameName: true,
      typesToDisable: ["TXT", "CNAME"],
      records: acmeRecordsData,
    };
    await dnsService.createBatchRecords(normalRecordsDataObj, customerLine);
    dnsService.createBatchRecords(acmeRecordsDataObj, customerLine);
  };
  return (
    <div>
      <Tip>请前往您的域名解析服务商（DNS）处更改您的记录指向</Tip>
      {keys.map((key, i) => {
        let acme = [];
        if (key.split(".")[0] === "*") {
          const arr_td = key.split(".").filter((v) => v !== "*");
          const td = arr_td.join(".");
          acme = (groupAcme && groupAcme[td]) || [];
        } else {
          acme = (groupAcme && groupAcme[key]) || [];
        }
        const record = formattedRecords[key] || [];
        return (
          <div className="dns-create-second-step" key={i}>
            <div>
              <div className="domain-key">{key}</div>
              <div className="th">
                <div>主机记录</div>
                <div>记录值</div>
              </div>
              {record.map((val, ii) => {
                const name = getFormattedValue(val, key);
                const nameValue = `${val
                  .split(".")
                  .filter((v) => v !== "*")
                  .join(".")}.${suffix}`;
                allRecords.push({
                  domain: key,
                  name,
                  value: nameValue,
                });
                const createdBefore = dnsService.createBatchRecordsResult$.find(
                  (r: any) =>
                    r.domain === key &&
                    r.name === name &&
                    r.value === nameValue + "."
                );
                return (
                  <div className="record" key={ii}>
                    <div className="host-record">{name}</div>
                    <IconFont
                      style={{ flex: 2 }}
                      type="icon-ic_arrow_forward_24px"
                    ></IconFont>
                    <div className="record-value">{nameValue}</div>
                    {/* {userStore.isDNSEnabled && ( */}
                    <div className="record-btn">
                      {createdBefore && !createdBefore.success && (
                        <IconFont type="icon-fail" />
                      )}
                      {createdBefore && createdBefore.success ? (
                        <IconFont type="icon-check-green" />
                      ) : (
                        <Btn
                          onClick={() =>
                            addToDns({
                              domain: key,
                              name,
                              value: nameValue,
                            })
                          }
                          className="ml-4"
                          delay
                        >
                          添加到DNS
                        </Btn>
                      )}
                    </div>
                    {/* )} */}
                  </div>
                );
              })}
              {acme.map((cname, ii) => {
                allRecords.push({
                  domain: key,
                  name: cname.record,
                  value: cname.value,
                  isAcme: true,
                });
                const createdBefore = dnsService.createBatchRecordsResult$.find(
                  (r: any) =>
                    r.domain === key &&
                    r.name === cname.record &&
                    r.value === cname.value + "."
                );
                return (
                  <div className="record" key={ii}>
                    <div className="host-record">{cname.record}</div>
                    <IconFont
                      style={{ flex: 2 }}
                      type="icon-ic_arrow_forward_24px"
                    ></IconFont>
                    <div className="record-value">{cname.value}</div>
                    {/* {userStore.isDNSEnabled && ( */}
                    <div className="record-btn">
                      {createdBefore && !createdBefore.success && (
                        <IconFont type="icon-fail" />
                      )}
                      {createdBefore && createdBefore.success ? (
                        <IconFont type="icon-check-green" />
                      ) : (
                        <Btn
                          onClick={() =>
                            addToDns(
                              {
                                domain: key,
                                name: cname.record,
                                value: cname.value,
                              },
                              true
                            )
                          }
                          className="ml-4"
                          delay
                        >
                          添加到DNS
                        </Btn>
                      )}
                    </div>
                    {/* )} */}
                  </div>
                );
              })}
            </div>
            <div className="dash-line" />
          </div>
        );
      })}
      <div
        style={{
          width: "350px",
          display: "flex",
          marginTop: "50px",
          justifyContent: "space-between",
        }}
      >
        <Btn type="primary" onClick={prev} boxShadow disabled={loading}>
          上一步
        </Btn>
        <Btn
          onClick={addAllToDns}
          type="primary"
          boxShadow
          disabled={loading}
          delay
        >
          全部验证
        </Btn>
        <Btn type="primary" onClick={next} boxShadow disabled={loading}>
          下一步
        </Btn>
        <Btn boxShadow onClick={onClose} disabled={loading}>
          取消
        </Btn>
      </div>
    </div>
  );
};
export default CreateDrawer;

export const getFormattedRecords = (records: any[] = []) => {
  let recs: Record<string, string[]> = {};
  records.forEach((rec) => {
    const parsedRec: any = psl.parse(rec);

    const val = recs[parsedRec.domain];

    const pd: string[] = rec.split(".");

    //去掉‘*’，得到顶级域名
    const arr_td = pd.filter((v) => v !== "*");
    const td = arr_td.join(".");

    //当记录列表里出现*开头的域名
    if (pd[0] === "*") {
      if (!recs[td]) {
        recs[td] = [];
      }
      //‘records’并且没有*.sample.com定级域名
      if (recs[td].indexOf(td) === -1) {
        recs[td] = [td, rec];
      } else if (recs[td].indexOf(td) !== -1) {
        recs[td] = [...recs[td], rec];
      }
      // recs[td] = _.uniq(recs[td])
    }
    if (pd[0] !== "*") {
      if (val) {
        recs[parsedRec.domain] = [...val, rec];
      } else {
        recs[parsedRec.domain] = [rec];
      }
      // recs[parsedRec.domain] = _.uniq(recs[parsedRec.domain])
    }
  });
  return recs;
};
export const getFormattedValue = (value: string, key: string) => {
  const arr_td = key.split(".").filter((v) => v !== "*");
  const td = arr_td.join(".");
  let formattedValue = value.replace(`.${td}`, "");
  formattedValue = formattedValue.replace(td, "@");
  if (value.split(".")[0] === "*") {
    formattedValue = "*";
  }
  return formattedValue;
};
