import { Template } from "@/components/template";
import {
  useInfoInquiryCustomerList,
  useInfoInquiryDomainList,
  useSite,
} from "@/store/network/infoInquiry";
import {} from "@/store/network/infoInquiry";
import infoInquiry from "@/store/network/infoInquiry/service";
import  { FC, useEffect, useState } from "react";

const Index: FC = () => {
  const [params, setParams] = useState<any>();
  const customerList = useInfoInquiryCustomerList();
  const site = useSite();
  const domainList = useInfoInquiryDomainList();
  const [siteOption, setSiteOption] = useState<Object[]>([]);
  const [cusNameOption, setCusNameOption] = useState<Object[]>([]);
  useEffect(() => {
    if (params) {
      if (params.filters !== undefined) {
        infoInquiry.domainList({
          customerUid: params.filters.customerUid,
          searchPage: params.searchPage,
          displayName: params.filters.displayName,
          keyword: params.filters.keyword,
          masterName: params.filters.masterName,
          siteUid: params.filters.siteUid,
          sslEnable: params.filters.sslEnable,
        });
      } else {
        infoInquiry.domainList({
          searchPage: { desc: 0, page: 1, pageSize: 25, sort: "name" },
        });
      }
    }
  }, [params]);

  useEffect(() => {
    infoInquiry.customerList({
      searchPage: { page: 1, pageSize: 99999 },
      uid: "",
    });
    infoInquiry.site();
  }, []);

  useEffect(() => {
    let siteOption: object[] = [];
    let cusNameOption: object[] = [];
    site &&
      Object.entries(site).map((item: any) => {
        let a = item[1];
        siteOption.push({ uid: a.uid, name: a.name });
      });
    customerList?.content &&
      Object.entries(customerList?.content).map((item: any) => {
        let a = item[1];
        cusNameOption.push({ uid: a.uid, name: a.name });
      });
    setSiteOption(siteOption);
    setCusNameOption(cusNameOption);
  }, [site, customerList?.content]);

  const TempConfig = {
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
        title: "顶级域名",
        dataIndex: "masterName",
        key: "masterName",
      },
      {
        title: "状态",
        dataIndex: "status",
        key: "status",
      },
      {
        title: "SSL状态",
        dataIndex: "sslEnable",
        key: "sslEnable",
      },
      {
        title: "网站",
        dataIndex: "site",
        key: "site",
        render: (key: any) => {
          return <div>{key.name}</div>;
        },
      },
      {
        title: "客户名称",
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
            text: "功能变数名称",
            name: "displayName",
            type: "input",
          },
          {
            text: "顶级域名",
            name: "masterName",
            type: "input",
          },
          {
            text: "SSL状态",
            name: "domainUid",
            data: [
              { uid: "1", name: "已启用" },
              { uid: "0", name: "未启用" },
            ],
            type: "select",
          },
          {
            text: "网站",
            name: "domainUid",
            data: siteOption,
            type: "select",
          },
          {
            text: "客户名称",
            name: "status",
            data: cusNameOption,
            type: "select",
          },
        ]}
        {...TempConfig}
      ></Template>
    </div>
  );
};

export default Index;
