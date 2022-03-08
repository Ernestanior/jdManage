import { Template } from "@/components/template";
import { dnsApi, siteApi } from "@/store/api";
import { useCustomerList } from "@/store/network/customer";
import customerService from "@/store/network/customer/service";
import { IDomainList } from "@/store/network/dns/interface";
import request from "@/store/request";
import { FC, useEffect, useMemo, useState } from "react";
import { from } from "rxjs";
import CustomerDrawer from "./customerDrawer";
const Index: FC = () => {
  const customerList = useCustomerList();
  const [site, setSite] = useState<any[]>();
  const [domainList, setDomainList] = useState<IDomainList>();
  const [drawerDetail, setDrawerDetail] = useState<any>();
  const [detailFlag, setDetailFlag] = useState<boolean>(false);
  useEffect(() => {
    if (!customerList || !customerList.content) {
      customerService.findCustomer({
        searchPage: { page: 1, pageSize: 99999 },
      });
    }
    const obs2 = from(request(siteApi.FindSiteAll())).subscribe(
      (data) => data && setSite(data)
    );
    return () => obs2.unsubscribe();
  }, []);
  const siteOption = useMemo(() => {
    return site instanceof Array
      ? site?.map((item: any) => ({ uid: item.uid, name: item.name }))
      : [];
  }, [site]);

  const cusNameOption = useMemo(
    () =>
      customerList && customerList.content
        ? customerList.content.map((item: any) => ({
            uid: item.uid,
            name: item.name,
          }))
        : [],
    [customerList]
  );

  const TempConfig = {
    optList: [
      {
        text: "查看客户",
        event: (data: any) => {
          setDrawerDetail(data.customer);
          setDetailFlag(true);
        },
      },
      {
        text: "进入站点",
        event: (data: any) => {
          //  navigator(`/cdn-site/${data.uid}`);
        },
      },
    ],
    onSearch: async (params: any) => {
      const payload = {
        ...params.filters,
        searchPage: params.searchPage,
      };
      const res = await request(dnsApi.FindDomain(payload));
      res && setDomainList(res);
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
        render: (key: any) => key.name,
      },
      {
        title: "客户名称",
        dataIndex: "customer",
        key: "customer",
        render: (key: any) => key.name,
      },
    ],
  };

  return (
    <div>
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
            name: "sslEnable",
            data: [
              { uid: "1", name: "已启用" },
              { uid: "0", name: "未启用" },
            ],
            type: "select",
          },
          {
            text: "网站",
            name: "siteUid",
            data: siteOption,
            type: "select",
          },
          {
            text: "客户名称",
            name: "customerUid",
            data: cusNameOption,
            type: "select",
          },
        ]}
        {...TempConfig}
        // event$={event$}
        sort="name"
      ></Template>
      <CustomerDrawer
        onClose={() => setDetailFlag(false)}
        visible={detailFlag}
        drawerDetail={drawerDetail}
      ></CustomerDrawer>
    </div>
  );
};

export default Index;
