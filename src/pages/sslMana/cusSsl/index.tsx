import { Template } from "@/components/template";
import { Role } from "@/components/template/interface";
import { useSslManageCerList } from "@/store/network/sslMange";
import sslManage from "@/store/network/sslMange/service";

import { FC, useEffect, useState } from "react";

const Index: FC<Role> = (props: Role) => {
  const [params, setParams] = useState<any>();

  const [newCertList, setNewCertList] = useState<any>();

  // const [dropDownFunction, setDropdownFunction] = useState<VoidFunction>();
  //const customerList = useSslManageCustomerList();
  const certList = useSslManageCerList();

  useEffect(() => {
    if (props.type === 1) {
      if (params !== undefined) {
        if (params.filters !== undefined) {
          sslManage?.certList({
            sslDomains: params.filters.sslDomains,
            searchPage: params.searchPage,
            keyword: params.filters.keyword,
            //   type: props.type,
            site: { name: params.filters.site },
            customer: { name: params.filters.customer },
          });
        }
      }
    }
  }, [params, props.type]);

  useEffect(() => {
    if (props.type === 1) {
      if (certList?.content !== undefined) {
        const arr = certList?.content.map((item: any, key: number) => ({
          ...item,
          key: key,
        }));
        const obj: object = {
          content: arr,
          number: certList?.number,
          numberOfElements: certList?.numberOfElements,
          size: certList?.size,
          sort: certList?.sort,
          totalElements: certList?.totalElements,
          totalPages: certList?.totalPages,
        };
        setNewCertList(obj);
      }
    }
  }, [
    certList?.content,
    certList?.number,
    certList?.numberOfElements,
    certList?.size,
    certList?.sort,
    certList?.totalElements,
    certList?.totalPages,
    props.type,
  ]);

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
      render: (key: any) => {
        return <div>{key !== null ? `${key}` : `-`}</div>;
      },
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
      title: "类型",
      dataIndex: "sslAuto",
      key: "sslAuto",
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
      text: "上传证书",
      onClick: (value: any) => {
        // setDeleteFlag(true);
        // setSelectedKey(value);
      },
    },
  ];

  const TempConfig = {
    batchBtns: batchBtns,
    onSearch: (params: any) => setParams(params),
    rowId: "key",
    data: newCertList,
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
            text: "网站",
            name: "site",
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
