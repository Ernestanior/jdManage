import { Template } from "@/components/template";
import UploadDrawer from "./uploadDrawer";
import DetailDrawer from "./detailDrawer";
import { FC, useState } from "react";
import { useLoading } from "@/components/loading";
import request from "@/store/request";
import { sslManageApi } from "@/store/api";
import { EdgeModal } from "@/components/modal";
import { notification } from "antd";
import useEvent from "@/hooks/useEvent";

const Index: FC = () => {
  const loading = useLoading();
  const [event$, sendMessage] = useEvent();

  const [detailFlag, setDetailFlag] = useState<boolean>(false);
  const [deleteFlag, setDeleteFlag] = useState<boolean>(false);
  const [uploadFlag, setUploadFlag] = useState<boolean>(false);

  const [certDetail, setCertDetail] = useState<any>();
  const [selected, setSelected] = useState<string[]>([]);
  const [certList, setCertList] = useState<any>();

  //Add new Key for the list due to no uniqueKey
  // const newCertList = useMemo(() => {
  //   return {
  //     ...certList,
  //     content: certList?.content.map((item: any, key: number) => ({
  //       ...item,
  //       key: key,
  //     })),
  //   };
  // }, [certList]);

  const deleteCustomer = async (data: string[]) => {
    const res = await request(sslManageApi.deleteCert(data));
    res instanceof Object
      ? notification.success({ message: "Delete Success" })
      : notification.error({ message: "Delete failed", description: data });
    sendMessage("reload");
    setDeleteFlag(false);
  };

  //TemplateConfig
  const TempConfig = {
    optList: [
      {
        text: "查看",
        event: async (data: any) => {
          const res = await request(sslManageApi.viewCert(data.uid));
          setCertDetail(res);
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
      if (params) {
        const payload = {
          sslDomains: params.filters.sslDomains,
          searchPage: params.searchPage,
          keyword: params.filters.keyword,
          site: { name: params.filters.site },
          customer: { name: params.filters.customer },
        };
        const res = await request(sslManageApi.certList(payload));
        setCertList(res);
      }
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
        render: (key: any) => {
          return <div>{key !== null ? `${key}` : `-`}</div>;
        },
      },
      {
        title: "站点",
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
      {
        title: "客户",
        dataIndex: "customer",
        key: "customer",
        render: (key: any) =>
          key !== "" ? <div>{key.name}</div> : <div>-</div>,
      },
    ],
    normalBtns: [
      {
        text: "上传证书",
        onClick: () => setUploadFlag(true),
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
        event$={event$}
      ></Template>
      <UploadDrawer
        onClose={() => setUploadFlag(false)}
        reload={() => sendMessage("reload")}
        visible={uploadFlag}
        loading={loading}
      ></UploadDrawer>
      <DetailDrawer
        onClose={() => setDetailFlag(false)}
        visible={detailFlag}
        certData={certDetail}
      ></DetailDrawer>
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
