// import "./index.less";
import { FC, useEffect, useMemo, useState } from "react";
import { Form, Drawer, Input, Select, Switch, notification, Row } from "antd";
import { useDnsDomainList } from "@/store/network/dns";
import dnsService from "@/store/network/dns/service";
import { from } from "rxjs";
import request from "@/store/request";
import { dnsApi } from "@/store/api";
import _ from "underscore";
import IconFont from "@/components/icon";
import { useLoading } from "@/components/loading";
import Loading from "@/components/loading/context";

interface IProps {
  dnsList: any[];
  id: number;
  onDelete: () => void;
  numOfList: number;
  onSubmit: Function;
}
const { Option } = Select;
const DnsSelector: FC<IProps> = ({
  dnsList,
  id,
  onDelete,
  numOfList,
  onSubmit,
}) => {
  const loading = useLoading();
  const [record, setRecord] = useState<any[]>();
  const [loading$, setLoading] = useState<boolean>(false);
  const [domain, setDomain] = useState<string>("");
  const [subDomain, setSubDomain] = useState<string[]>([]);

  // const dnsList = useDnsDomainList();
  useEffect(() => {
    if (subDomain && domain) {
      onSubmit(subDomain.map((item) => `${item}.${domain}`));
      // onSubmit({ [domain]: subDomain });
    }
  }, [subDomain, domain]);
  // console.log(dnsList);

  const domainChange = (domainUid: string) => {
    setLoading(true);
    const payload = { domainUid, searchPage: { page: 1, pageSize: 9999 } };
    from(request(dnsApi.FindDnsRecord(payload))).subscribe((data) => {
      if (data && data.content) {
        // uniq方法去重,再去default选项
        const newList = _.uniq(data.content, "name").filter(
          (item: any) =>
            item.defaultStatus !== "default" && item.name !== "_acme-challenge"
        );
        setRecord(newList);
        setLoading(false);
      }
    });
  };
  // useEffect(()=>{
  //   if(domainUid){
  //     setLoading(true);
  //     const payload = { domainUid, searchPage: { page: 1, pageSize: 9999 } };
  //     from(request(dnsApi.FindDnsRecord(payload))).subscribe((data) => {
  //       if (data && data.content) {
  //         // uniq方法去重,再去default选项
  //         const newList = _.uniq(data.content, "name").filter(
  //           (item: any) =>
  //             item.defaultStatus !== "default" && item.name !== "_acme-challenge"
  //         );
  //         setRecord(newList);
  //         setLoading(false);
  //       }
  //     });
  //   }
  // },[])

  return (
    <Row style={{ marginTop: 20, display: "flex", alignItems: "center" }}>
      <Select
        style={{ width: 200, marginRight: 20 }}
        onChange={(value) => {
          setSubDomain([]);
          domainChange(value.split("+++")[0]);
          setDomain(value.split("+++")[1]);
        }}
      >
        {dnsList &&
          dnsList.map((v: any) => (
            <Option value={`${v.uid}+++${v.displayName}`} key={v.uid}>
              {v.displayName}
            </Option>
          ))}
      </Select>
      <Select
        style={{ width: 200 }}
        onChange={(list) => setSubDomain(list)}
        value={subDomain}
        mode="multiple"
        loading={loading$}
      >
        {record &&
          record.map((v: any) => (
            <Option value={v.displayName} key={v.uid}>
              {v.displayName}
            </Option>
          ))}
      </Select>
      {/* {numOfList > 1 && ( */}
      <IconFont
        onClick={onDelete}
        style={{
          color: "#ef8f35",
          fontSize: "20px",
          marginLeft: "5px",
        }}
        type="icon-trash"
      />
      {/* )} */}
    </Row>
  );
};
export default DnsSelector;
