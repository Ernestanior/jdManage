import { Template } from "@/components/template";
import { useDomainList } from "@/store/network/dnsManage";
import { useRecordList } from "@/store/network/dnsManage";
import dnsManage from "@/store/network/dnsManage/service";
import { FC, useEffect, useState } from "react";

const Index: FC = () => {
  const [params, setParams] = useState<any>();
  const domainList = useDomainList();
  const recordList = useRecordList();
  const [option, setOption] = useState<Object[]>([]);
  
  useEffect(() => {
    if (params) {
      if (params.filters !== undefined) {
        dnsManage?.recordList({
          keyword: params.filters.keyword,
          searchPage: params.searchPage,
          domainUid: params.filters.domainUid,
          status: params.filters.status,
          value: params.filters.value,
          name: params.filters.name,
        });
      } else {
        dnsManage?.recordList({
          searchPage: { desc: 0, page: 1, pageSize: 25, sort: "create_date" },
        });
      }
    }
  }, [params]);

  useEffect(() => {
    dnsManage?.domainList({
      searchPage: { page: 1, pageSize: 99999 },
      uid: "",
    });
  }, []);

  useEffect(() => {
    if (domainList) {
      let dnsOption: object[] = [];
      Object.entries(domainList?.content).map((item: any) => {
        let a = item[1];
        dnsOption.push({ uid: a.uid, name: a.name });
      });
      setOption(dnsOption);
    }
  }, [domainList]);

  const TempConfig = {
    onSearch: (params: any) => {
      setParams(params);
    },
    rowId: "uid",
    data: recordList,
    config: [
      {
        title: "功能变数名称",
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
            text: "功能變數名稱",
            name: "domainUid",
            data: option,
            type: "select",
          },
          {
            text: "狀態",
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
