import { Template } from "@/components/template";
import { sslManageApi } from "@/store/api";
import request from "@/store/request";
import { notification } from "antd";
import ApplyDrawer from "./applyDrawer";
import DetailDrawer from "./detailDrawer";
import { FC, useState } from "react";
import { useLoading } from "@/components/loading";
import useEvent from "@/hooks/useEvent";
import { EdgeModal } from "@/components/modal";

const Index: FC = () => {
  const loading = useLoading();
  const [event$, sendMessage] = useEvent();

  const [detailFlag, setDetailFlag] = useState<boolean>(false);
  const [deleteFlag, setDeleteFlag] = useState<boolean>(false);
  const [applyFlag, setApplyFlag] = useState<boolean>(false);

  const [selected, setSelected] = useState<string[]>([]);
  const [originDetail, setOriDetail] = useState<any>();
  const [certList, setCertList] = useState<any>();

  const deleteCustomer = async (data: string[]) => {
    const res = await request(sslManageApi.originCertDelete(data));
    res instanceof Object
      ? notification.success({ message: "Delete Success" })
      : notification.error({ message: "Delete failed", description: data });
    sendMessage("reload");
    setDeleteFlag(false);
  };

  const TempConfig = {
    optList: [
      {
        text: "查看",
        event: async (data: any) => {
          const res = await request(sslManageApi.viewOriginCert(data.uid));
          setOriDetail(res);
          setDetailFlag(true);
        },
      },
      {
        text: "删除",
        event: (data: any) => {
          setSelected([data.uid]);
          setDeleteFlag(true);
        },
      },
    ],
    batchBtns: [
      {
        text: "批量删除",
        onClick: (value: any) => {
          setDeleteFlag(true);
          setSelected(value);
        },
      },
    ],
    onSearch: async (params: any) => {
      const payload = params && {
        sslDomains: params.filters.sslDomains,
        searchPage: params.searchPage,
        keyword: params.filters.keyword,
        customer: { name: params.filters.customer },
      };
      const res = await request(sslManageApi.originCertList(payload));
      setCertList(res);
    },
    rowId: "uid",
    data: certList,
    config: [
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
    ],
    normalBtns: [
      {
        text: "申请证书",
        onClick: () => setApplyFlag(true),
      },
    ],
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
        event$={event$}
      ></Template>

      <DetailDrawer
        onClose={() => setDetailFlag(false)}
        visible={detailFlag}
        certData={originDetail}
      ></DetailDrawer>
      <ApplyDrawer
        onClose={() => setApplyFlag(false)}
        reload={() => sendMessage("reload")}
        visible={applyFlag}
        loading={loading}
      ></ApplyDrawer>
      <EdgeModal
        visible={deleteFlag}
        onCancel={() => setDeleteFlag(false)}
        onOk={() => deleteCustomer(selected)}
        title="删除"
        loading={loading}
      >
        你确定删除此账户？
      </EdgeModal>
    </div>
  );
};

export default Index;
