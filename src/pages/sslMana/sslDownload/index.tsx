import { Template } from "@/components/template";
import { IRenderConfig } from "@/components/template/fastRender";
import IconFont from "@/components/icon";
import moment from "moment";
import { FC, useEffect, useMemo, useState } from "react";
import { dnsApi } from "@/store/api";
import request from "@/store/request";
import { EdgeModal } from "@/components/modal";
import { useLoading } from "@/components/loading";
import useEvent from "@/hooks/useEvent";
import { notification } from "antd";
import { useCustomerList } from "@/store/network/customer";
import { from } from "rxjs";
const Index: FC = () => {
  const [deleteFlag, setDeleteFlag] = useState<boolean>(false);
  const loading$ = useLoading();
  const [loading, setLoading] = useState<boolean>(false);
  const [event$, sendMessage] = useEvent();
  const [deleteUid, setDeleteUid] = useState<any>();
  const [dnsCertList, setDnsCertList] = useState<string>();
  const [dnsCustomerList, setDnsCustomerList] = useState<any>();

  useEffect(() => {
    const obs = from(
      request(
        dnsApi.FindCustomerList({ searchPage: { page: 1, pageSize: 9999 } })
      )
    ).subscribe((data) => {
      setDnsCustomerList(data);
    });
    return () => obs.unsubscribe();
  }, []);

  const customerList = useMemo(
    () =>
      dnsCustomerList &&
      dnsCustomerList.content &&
      dnsCustomerList.content.map((item: any) => ({
        uid: item.uid,
        name: item.name,
      })),

    [dnsCustomerList]
  );
  const deleteCustomer = async (data: string[]) => {
    const res = await request(dnsApi.DnsCertDelete([deleteUid]));
    res instanceof Object
      ? notification.success({ message: "Delete Success" })
      : notification.error({ message: "Delete failed", description: data });
    sendMessage("reload");
    setDeleteFlag(false);
  };

  const config = [
    {
      title: "证书",
      dataIndex: "sslDomains",
      key: "sslDomains",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "到期时间",
      dataIndex: "",
      key: "",
      render: () => {
        return <div>-</div>;
      },
    },
    {
      title: "申请时间",
      dataIndex: "operateTime",
      key: "operateTime",
      render: (key: any) => {
        if (key !== null) {
          const x = moment(key).format("YYYY-MM-DD h:mm:ss");
          return <div>{x}</div>;
        } else return <div>-</div>;
      },
    },
    {
      title: "客户",
      dataIndex: "customer",
      key: "customer",
      render: (key: any) => {
        if (key !== null) {
          return <div>{key.name}</div>;
        } else return <div>-</div>;
      },
    },
  ];

  const option: IRenderConfig[] = [
    {
      text: "证书",
      name: "sslDomains",
      type: "input",
    },
    {
      text: "客户",
      name: "customerUid",
      data: customerList || [],
      type: "select",
    },
  ];
  const TempConfig = {
    optList: [
      {
        icon: (
          <IconFont
            type="icon-shanchu"
            style={{ fontSize: 18, color: "#FF8900" }}
          ></IconFont>
        ),
        event: (data: any) => {
          setDeleteUid(data.uid);
          setDeleteFlag(true);
        },
      },
    ],
    onSearch: async (params: any) => {
      setLoading(true);
      const res = await request(
        dnsApi.DnsCertList({
          keyword: params.filters.keyword,
          searchPage: params.searchPage,
          customerUid: params.filters.customerUid,
          sslDomains: params.filters.sslDomains,
        })
      );
      setLoading(false);
      setDnsCertList(res);
    },
    rowId: "uid",
    data: dnsCertList,
    config: config,
  };

  return (
    <>
      <Template
        primarySearch={"keyword"}
        searchList={option}
        {...TempConfig}
        event$={event$}
        loading={loading}
      ></Template>
      <EdgeModal
        visible={deleteFlag}
        onCancel={() => setDeleteFlag(false)}
        onOk={() => deleteCustomer(deleteUid)}
        title="删除"
        loading={loading$}
      >
        你确定删除此账户？
      </EdgeModal>
    </>
  );
};

export default Index;
