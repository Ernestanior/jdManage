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
interface IProps {
  dnsList: any[];
}
const { Option } = Select;
const DnsSelector: FC<IProps> = ({ dnsList }) => {
  const [record, setRecord] = useState<any[]>();
  // const dnsList = useDnsDomainList();
  // useEffect(() => {
  //   if (!dnsList) {
  //     dnsService.findDnsDomain({
  //       searchPage: { page: 1, pageSize: 9999 },
  //       uid: "",
  //     });
  //   }
  // }, []);
  // console.log(dnsList);
  console.log(record);

  const dnsChange = (domainUid: string) => {
    const payload = { domainUid, searchPage: { page: 1, pageSize: 9999 } };
    from(request(dnsApi.FindDnsRecord(payload))).subscribe((data) => {
      if (data && data.content) {
        // uniq方法去重,再去default选项
        const newList = _.uniq(data.content, "name").filter(
          (item: any) =>
            item.defaultStatus !== "default" && item.name !== "_acme-challenge"
        );
        setRecord(newList);
      }
    });
  };
  console.log(record);

  return (
    <Row style={{ marginTop: 10, display: "flex", alignItems: "center" }}>
      <Select
        style={{ width: 200, marginRight: 20 }}
        onChange={(uid) => dnsChange(uid)}
      >
        {dnsList &&
          dnsList.map((v: any) => (
            <Option value={v.uid} key={v.uid}>
              {v.displayName}
            </Option>
          ))}
      </Select>
      <Select
        style={{ width: 200 }}
        onChange={(uid) => console.log(uid)}
        mode="multiple"
      >
        {record &&
          record.map((v: any) => (
            <Option value={v.uid} key={v.uid}>
              {v.displayName}
            </Option>
          ))}
      </Select>
      <IconFont
        onClick={() => {}}
        style={{
          color: "#ef8f35",
          fontSize: "20px",
          marginLeft: "5px",
        }}
        type="icon-trash"
      />
    </Row>
  );
};
export default DnsSelector;
