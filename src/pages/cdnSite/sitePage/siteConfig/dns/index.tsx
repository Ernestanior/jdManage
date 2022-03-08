import { FC, ReactElement, useMemo, useState } from "react";
import { Template } from "@/components/template";
import useEvent from "@/common/hooks/useEvent";
import { useNavigate } from "react-router-dom";
import { EdgeModal } from "@/components/modal";
import { from } from "rxjs";
import request from "@/store/request";
import { dnsApi, siteApi } from "@/store/api";
import { notification } from "antd";
import useUid from "@/hooks/useUid";
import CreateDrawer from "./createDrawer";
import Msg from "./msg";
import { IDomainList } from "@/store/network/dns/interface";

const Index: FC = (): ReactElement => {
  const navigator = useNavigate();
  const uid = useUid();
  const [currData, setCurrData] = useState<IDomainList>();
  // // 表格数据
  // const currdata = useMemo(() => {
  //   if (currData && currData.content) {
  //     return currData;
  //   }
  // }, [currData]);

  // 表格内选中的数据的key集合
  const [selectedRowKeys, setSelectedKey] = useState<string[]>([]);
  const [editRow, setEditRow] = useState<string>("");

  const [createFlag, setCreateFlag] = useState(false);
  const [editFlag, setEditFlag] = useState(false);
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [enableFlag, setEnableFlag] = useState(false);
  const [disableFlag, setDisableFlag] = useState(false);

  const [event$, sendMessage] = useEvent();
  const closeEvent = (
    type: "create" | "edit" | "disable" | "delete" | "enable"
  ) => {
    if (type === "create") {
      setCreateFlag(false);
    }
    if (type === "edit") {
      setEditFlag(false);
    }
    if (type === "disable") {
      setDisableFlag(false);
    }
    if (type === "enable") {
      setEnableFlag(false);
    }
    if (type === "delete") {
      setDeleteFlag(false);
    }
    sendMessage("reload");
  };
  const TempConfig = {
    optList: [
      {
        text: "配置",
        event: (data: any) => {
          // navigator(`/cdn-site/${data.uid}`);
        },
      },
      {
        text: "编辑",
        event: (data: any) => {
          setEditRow(data);
          setEditFlag(true);
        },
      },
      {
        text: "删除",
        event: (data: any) => {
          setDeleteFlag(true);
          setSelectedKey([data.uid]);
        },
      },
    ],
    onSearch: async (params: any) => {
      const payload = {
        ...params.filters,
        siteUid: uid || "",
        searchPage: params.searchPage,
      };
      const res = await request(dnsApi.FindDomain(payload));
      setCurrData(res);
    },
    batchBtns: [
      {
        text: "删除记录",
        onClick: (value: any) => {
          setDeleteFlag(true);
          setSelectedKey(value);
        },
      },
      {
        text: "启用SSL",
        onClick: (value: any) => {
          setEnableFlag(true);
          setSelectedKey(value);
        },
      },
      {
        text: "禁用SSL",
        onClick: (value: any) => {
          setDisableFlag(true);
          setSelectedKey(value);
        },
      },
      {
        text: "申请证书",
        onClick: (value: any) => {
          // setDisableFlag(true);
          // setSelectedKey(value);
        },
      },
    ],
    normalBtns: [
      {
        text: "新增记录",
        onClick: () => setCreateFlag(true),
      },
    ],
    rowId: "uid",
    data: currData,
    config: [
      {
        title: "记录",
        dataIndex: "displayName",
        key: "displayName",
      },
      {
        title: "域名",
        dataIndex: "masterName",
        key: "masterName",
      },
      {
        title: "CNAME",
        dataIndex: "cname",
        key: "cname",
      },
      {
        title: "状态",
        dataIndex: "status",
        key: "status",
        render: (status: number) => {
          switch (status) {
            case -1:
              return (
                <div className={`${"status-box"} ${"status-error"}`}>故障</div>
              );
            case 0:
              return (
                <div className={`${"status-box"} ${"status-normal"}`}>正常</div>
              );
            case 1:
              return (
                <div className={`${"status-box"} ${"status-processing"}`}>
                  处理中
                </div>
              );
            default:
              return (
                <div className={`${"status-box"} ${"status-normal"}`}>正常</div>
              );
          }
        },
      },
      {
        title: "DNS状态",
        dataIndex: "dnsStatus",
        key: "dnsStatus",
        render: (status: number) => (status ? "已指向" : "未指向"),
      },
      {
        title: "SSL状态",
        dataIndex: "sslEnable",
        key: "sslEnable",
        render: (status: number) => (status === 1 ? "已启用" : "未启用"),
      },
    ],
  };
  return (
    <>
      <Msg></Msg>
      <Template
        searchList={[
          { type: "input", text: "记录", name: "displayName" },
          { type: "input", text: "域名", name: "masterName" },
          {
            type: "select",
            text: "DNS状态",
            name: "dnsStatus",
            data: [
              { uid: "1", name: "已指向" },
              { uid: "0", name: "未指向" },
            ],
          },
          {
            type: "select",
            text: "SSL状态",
            name: "sslEnable",
            data: [
              { uid: "1", name: "已启用" },
              { uid: "0", name: "未启用" },
            ],
          },
        ]}
        primarySearch="displayName"
        event$={event$}
        {...TempConfig}
      />
      <EdgeModal
        visible={deleteFlag}
        onOk={async () => {
          const res = await request(siteApi.DeleteSite(selectedRowKeys));
          if (res.length) {
            res.forEach((item: any) =>
              notification.error({
                message: "Delete Failed",
                description: `UID: ${item.uid} ${item.message}`,
              })
            );
          } else {
            notification.success({
              message: "Delete Success",
            });
          }
          closeEvent("delete");
        }}
        onCancel={() => setDeleteFlag(false)}
      >
        确定删除该站点?
      </EdgeModal>
      <EdgeModal
        visible={enableFlag}
        onOk={async () => {
          const res = await request(siteApi.EnableSite(selectedRowKeys));
          if (res.length) {
            res.forEach((item: any) =>
              notification.error({
                message: "Enable Failed",
                description: `UID: ${item.uid} ${item.message}`,
              })
            );
          } else {
            notification.success({
              message: "Enable Success",
            });
          }
          closeEvent("enable");
        }}
        onCancel={() => setDeleteFlag(false)}
      >
        确定启用该站点?
      </EdgeModal>
      <EdgeModal
        visible={disableFlag}
        onOk={async () => {
          const res = await request(siteApi.DisableSite(selectedRowKeys));
          if (res.length) {
            res.forEach((item: any) =>
              notification.error({
                message: "Disable Failed",
                description: `UID: ${item.uid} ${item.message}`,
              })
            );
          } else {
            notification.success({
              message: "Disable Success",
            });
          }
          closeEvent("disable");
        }}
        onCancel={() => setDeleteFlag(false)}
      >
        确定禁用该站点?
      </EdgeModal>
      <CreateDrawer
        onClose={() => {
          setCreateFlag(false);
          navigator(".", { state: { dnsCreate: "1" } });
        }}
        title="新增域名"
        visible={createFlag}
      ></CreateDrawer>
    </>
  );
};

export default Index;
