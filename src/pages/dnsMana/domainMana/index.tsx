import { Template } from "@/components/template";
import { useDomainList } from "@/store/network/dnsManage";
import { useDnsCustomerList } from "@/store/network/dnsManage";
import dnsManage from "@/store/network/dnsManage/service";
import React, { FC, useEffect, useState } from "react";

const Index: FC = () => {
  const [params, setParams] = useState<any>();
  const domainList = useDomainList();
  const customerList = useDnsCustomerList();
  const [option, setOption] = useState<Object[]>([]);
  useEffect(() => {
    if (params) {
      if (params.filters !== undefined) {
        dnsManage?.domainList({
          keyword: params.filters.keyword,
          searchPage: params.searchPage,
          customerUid: params.filters.customerUid,
          status: params.filters.status,
        });
      } else {
        dnsManage?.domainList({
          searchPage: { desc: 0, page: 1, pageSize: 25, sort: "name" },
        });
      }
    }
  }, [params]);

  useEffect(() => {
    dnsManage?.customerList({
      searchPage: { page: 1, pageSize: 99999 },
      type: "customer",
    });
  }, []);

  useEffect(() => {
    if (customerList) {
      let dnsOption: object[] = [];
      Object.entries(customerList?.content).map((item: any) => {
        let a = item[1];
        dnsOption.push({ uid: a.uid, name: a.name });
      });
      setOption(dnsOption);
    }
  }, [customerList]);

  const TempConfig = {
    batchBtns: [
      {
        text: "批量删除",
        onClick: (value: any) => {
          // setDeleteFlag(true);
          // setSelectedKey(value);
        },  
      },
      {
        text: "批量启用",
        onClick: (value: any) => {
          // setEnableFlag(true);
          // setSelectedKey(value);
        },
      },
      {
        text: "批量禁用",
        onClick: (value: any) => {
          // setDisableFlag(true);
          // setSelectedKey(value);
        },
      },
    ],
    normalBtns: [
      {
        text: "新增站点",
        onClick: () => true,
      },
    ],
    onSearch: (params: any) => {
      setParams(params);
    },
    rowId: "uid",
    data: domainList,
    config: [
      {
        title: "功能变数名称",
        dataIndex: "displayName",
        key: "displayName",
      },
      {
        title: "域名状态",
        dataIndex: "status",
        key: "status",
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
    ],
  };

  return (
    <div>
      {" "}
      <Template
        primarySearch={"keyword"}
        searchList={[
          {
            text: "平台账号",
            name: "name",
            type: "input",
          },
          {
            text: "平台",
            name: "status",
            data: [
              { uid: "enabled", name: "已启用" },
              { uid: "disabled", name: "未启用" },
            ],
            type: "select",
          },
          {
            text: "平台",
            name: "customerUid",
            data: option,
            type: "select",
          },
        ]}
        {...TempConfig}
      ></Template>
    </div>
  );
};

export default Index;
