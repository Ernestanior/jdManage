import { Template } from "@/components/template";
import { dnsApi } from "@/store/api";
import request from "@/store/request";
import { FC, useEffect, useMemo, useState } from "react";
import { from } from "rxjs";

const Index: FC = () => {
  const [recordList, setRecordList] = useState();
  const [option, setOption] = useState<Object[]>([]);

  useMemo(async () => {
    const result = await request(
      dnsApi.FindDnsDomain({
        searchPage: { page: 1, pageSize: 99999 },
        uid: "",
      })
    );
    const option = result.content.map(({ uid, name }: any) => {
      return { uid, name };
    });
    setOption(option);
  }, []);

  const TempConfig = {
    onSearch: ({ searchPage, filters }: any) => {
      let searchDetail = {
        ...filters,
        searchPage,
      };
      from(request(dnsApi.FindDnsRecord(searchDetail))).subscribe((data) => {
        console.log(data);
        setRecordList(data);
      });
    },
    rowId: "uid",
    data: recordList,
    config: [
      {
        title: "主机记录值",
        dataIndex: "displayName",
        key: "displayName",
      },
      {
        title: "域名",
        dataIndex: "domain",
        key: "domain",
      },
      {
        title: "记录类型",
        dataIndex: "type",
        key: "type",
      },
      {
        title: "线路",
        dataIndex: "line",
        key: "line",
        render: (key: any) => {
          return <div>{key.name}</div>;
        },
      },
      {
        title: "记录值",
        dataIndex: "displayValue",
        key: "displayValue",
      },
      {
        title: "MX/权重",
        dataIndex: "weight",
        key: "weight",
      },
      {
        title: "TTL",
        dataIndex: "ttl",
        key: "ttl",
      },
      {
        title: "备注",
        dataIndex: "remark",
        key: "remark",
      },
      {
        title: "客户",
        dataIndex: "customer",
        key: "customer",
        render: (key: any) => {
          return <div>{key.name}</div>;
        },
      },
      {
        title: "状态",
        dataIndex: "status",
        key: "status",
        render: (status: any) =>
          status === "enabled" ? (
            <div
              className={`${"status-box"} ${"status-normal"}`}
              style={{ fontSize: 12 }}
            >
              已启用
            </div>
          ) : (
            <div
              className={`${"status-box"} ${"status-error"}`}
              style={{ fontSize: 12 }}
            >
              未启用
            </div>
          ),
      },
    ],
  };

  return (
    <div>
      {" "}
      <Template
        primarySearch={"keyword"}
        searchList={[
          {
            text: "主机记录值",
            name: "name",
            type: "input",
          },
          {
            text: "记录值",
            name: "value",
            type: "input",
          },
          {
            text: " 域名",
            name: "domainUid",
            data: option,
            type: "select",
          },
          {
            text: "状态 ",
            name: "status",
            data: [
              { uid: "enabled", name: "已启用" },
              { uid: "disabled", name: "未启用" },
            ],
            type: "select",
          },
        ]}
        {...TempConfig}
      ></Template>
    </div>
  );
};

export default Index;
