// import "./index.less";
import { FC, useMemo, useState } from "react";
import { useDnsCnameList } from "@/store/network/dns";
import { Btn } from "@/components/button";
import useUid from "@/hooks/useUid";
import { useLoading } from "@/components/loading";
import { useLocation } from "react-router-dom";
import _ from "underscore";
import Tip from "@/components/tip";
import { getFormattedRecords, getFormattedValue } from "../secondStep";
import IconFont from "@/components/icon";
import { dnsApi } from "@/store/api";
import request from "@/store/request";
import { IValidateCNameResult } from "@/store/network/dns/interface";
import "./index.less";
interface IProps {
  onClose: () => void;
  prev: () => void;
}
const CreateDrawer: FC<IProps> = ({ onClose, prev }) => {
  const siteUid = useUid();
  const loading = useLoading();
  const { domains }: any = useLocation().state;
  const acmelist = useDnsCnameList();
  const [cNameValidated, setCNameValidated] = useState<IValidateCNameResult>(
    {}
  );
  const [refresh, setRefresh] = useState<boolean>(false);
  const formattedRecords = useMemo(
    () => getFormattedRecords(domains),
    [domains]
  );
  const keys = useMemo(() => Object.keys(formattedRecords), [formattedRecords]);
  const groupAcme = useMemo(
    () => acmelist && _.groupBy(acmelist, "name"),
    [acmelist]
  );

  const renderValidatedResult = (record: string) => {
    const value = cNameValidated && cNameValidated[record];
    return (
      <div className="record-btn">
        {value === false && <IconFont type="icon-fail" />}
        {value ? (
          <IconFont type="icon-check-green" />
        ) : (
          <Btn onClick={() => verifyCName(record)}>验证</Btn>
        )}
      </div>
    );
  };
  const renderValidatedResultDns = (
    domain: string // record + . + name
  ) => {
    const currentDomain =
      acmelist && acmelist.find((c) => `${c.record}.${c.name}` === domain);

    if (currentDomain) {
      return (
        <div className="record-btn">
          {currentDomain.validate === "nope" && <IconFont type="icon-fail" />}
          {currentDomain.validate === "yep" ? (
            <IconFont type="icon-check-green" />
          ) : (
            <Btn onClick={() => verifyDns(domain)} className="btn btn-primary">
              验证
            </Btn>
          )}
        </div>
      );
    }
  };
  const verifyDns = async (domain?: string) => {
    const domains = domain
      ? [domain]
      : acmelist?.map((v) => `${v.record}.${v.name}`);
    console.log(domains);
    domains?.map(async (domain) => {
      const res: boolean = await request(dnsApi.ValidateDNS(siteUid, domain));
      const currentDomain =
        acmelist && acmelist.find((c) => `${c.record}.${c.name}` === domain);
      if (currentDomain) {
        currentDomain.validate = res ? "yep" : "nope";
      }
      setRefresh(!refresh);
    });
  };
  const verifyCName = async (selectedCName?: string) => {
    let displayNames: string[] = [];
    const record_array: string[] = [...domains.toString().split(",")];
    record_array
      .filter((v) => !!v)
      .map((v: string) => {
        const topDomain = v
          .split(".")
          .filter((i) => i !== "*")
          .join(".");
        if (record_array.indexOf(topDomain) === -1) {
          displayNames.push(topDomain);
        }
        displayNames.push(v);
      });

    const domain = {
      siteUid,
      displayNames: selectedCName ? [selectedCName] : displayNames,
    };
    console.log(domain);
    const result = await request(dnsApi.ValidateCName(domain));
    setCNameValidated({ ...cNameValidated, ...result });
  };
  return (
    <div>
      <Tip>
        此步骤为DNS指向验证, 为避免DNS指向问题造成指向失败,
        需通过Edgejoint的域名指向验证, 确保DNS指向正确
      </Tip>
      {keys.map((key, i) => {
        const acme = (groupAcme && groupAcme[key]) || [];
        const value = formattedRecords[key] || [];

        return (
          <div className="dns-create-third-step" key={i}>
            <div>
              <div className="domain-key">{key}</div>
              {value.map((val, ii) => {
                const name = getFormattedValue(val, key);
                return (
                  <div className="record" key={ii}>
                    <div className="host-record">{name}</div>
                    {renderValidatedResult(val)}
                  </div>
                );
              })}
              {acme.map((cname, ii) => {
                return (
                  <div className="record" key={ii}>
                    <div className="host-record">{cname.record}</div>
                    {renderValidatedResultDns(`${cname.record}.${cname.name}`)}
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
          onClick={() => {
            verifyCName();
            verifyDns();
          }}
          type="primary"
          boxShadow
          disabled={loading}
          delay
        >
          全部验证
        </Btn>
        <Btn boxShadow onClick={onClose} disabled={loading}>
          取消
        </Btn>
      </div>
    </div>
  );
};
export default CreateDrawer;
