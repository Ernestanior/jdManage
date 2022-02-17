import { Template } from "@/components/template";
import { Role } from "@/components/template/interface";

import { useSslManageOriginCertList } from "@/store/network/sslMange";
import sslManage from "@/store/network/sslMange/service";

import { FC, useEffect, useState } from "react";

const Index: FC<Role> = (props: Role) => {
  const [params, setParams] = useState<any>();
  const originCertList = useSslManageOriginCertList();
  useEffect(() => {
    if (props.type === 2) {
      if (params !== undefined) {
        if (params.filters !== undefined) {
          sslManage?.originCertList({
            sslDomains: params.filters.sslDomains,
            searchPage: params.searchPage,
            keyword: params.filters.keyword,
            customer: { name: params.filters.customer },
          });
        }
      }
    }
  }, [params, props.type]);

  const config = [
    {
      title: "证书",
      dataIndex: "sslDomains",
      key: "sslDomains",
    },
    {
      title: "相关域名",
      dataIndex: "domains",
      key: "domains",
    },
    {
      title: "网站",
      dataIndex: "site",
      key: "site",
      render: (key: any) => {
        if (key !== null) {
          return <div>{key.name}</div>;
        } else {
          return <div>-</div>;
        }
      },
    },
    {
      title: "过期时间",
      dataIndex: "sslExpire",
      key: "sslExpire",
    },
    {
      title: "客户",
      dataIndex: "customer",
      key: "customer",
      render: (key: any) => {
        if (key !== null) {
          return <div>{key.name}</div>;
        }
      },
    },
  ];

  const batchBtns = [
    {
      text: "大量删除",
      onClick: (value: any) => {
        // setEnableFlag(true);
        // setSelectedKey(value);
      },
    },
  ];

  const normalBtns = [
    {
      text: "申请证书",
      onClick: (value: any) => {
        // setDeleteFlag(true);
        // setSelectedKey(value);
      },
    },
  ];

  const TempConfig = {
    batchBtns: batchBtns,
    onSearch: (params: any) => setParams(params),
    rowId: "uid",
    data: originCertList,
    config: config,
    normalBtns: normalBtns,
  };

  return (
    <div>
      <Template
        primarySearch={"sslDomains"}
        searchList={[
          {
            text: "证书",
            name: "sslDomains",
            type: "input",
          },
          {
            text: "客户",
            name: "customer",
            type: "input",
          },
        ]}
        {...TempConfig}
      ></Template>
    </div>
  );
};

export default Index;
