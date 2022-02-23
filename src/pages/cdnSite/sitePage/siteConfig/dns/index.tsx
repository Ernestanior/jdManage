// import React, { FC, ReactElement } from "react";
// import Msg from "./msg";
// import RecordList from "./recordList";
// const Index: FC = (): ReactElement => {
//   return (
//     <div>
//       <Msg></Msg>
//       <RecordList></RecordList>
//     </div>
//   );
// };

// export default Index;
import { FC, ReactElement, useEffect, useMemo, useState } from "react";
import { Template } from "@/components/template";
import useEvent from "@/common/hooks/useEvent";
import dnsService from "@/store/network/dns/service";
// import CreateDrawer from "./createDrawer";
// import EditDrawer from "./editDrawer";
import { useCustomerList } from "@/store/network/customer";
import customerService from "@/store/network/customer/service";
import { useNavigate } from "react-router-dom";
import { EdgeModal } from "@/components/modal";
import { from } from "rxjs";
import request from "@/store/request";
import { siteApi } from "@/store/api";
import { notification } from "antd";
import { useDomainList } from "@/store/network/dns";
import useUid from "@/hooks/useUid";
import CreateDrawer from "./createDrawer";
import Msg from "./msg";

// interface IData {
//   number: number;
//   size: number;
//   totalPages: number;
//   numberOfElements: number;
//   totalElements: number;
//   sort: any;
//   content: any[];
// }

const Index: FC = (): ReactElement => {
  const navigator = useNavigate();

  // 获取当前uid
  const uid = useUid();
  // const customerList = useCustomerList();
  // useEffect(() => {
  //   if (!customerList || !customerList.content) {
  //     customerService.findCustomer({
  //       searchPage: { page: 1, pageSize: 99999 },
  //     });
  //   }
  // }, [customerList]);
  // const cusList = useMemo(
  //   () => (customerList && customerList.content) || [],
  //   [customerList]
  // );

  const currData = useDomainList();
  // 表格数据
  const currdata = useMemo(() => {
    if (currData && currData.content) {
      return currData;
    }
  }, [currData]);

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
    onSearch: (params: any) => {
      // const { customerUid, health, status, name } = params.filters;

      dnsService.findDomain({
        ...params.filters,
        siteUid: uid || "",
        searchPage: params.searchPage,
      });
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
    data: currdata,
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
        onOk={() => {
          from(request(siteApi.DeleteSite(selectedRowKeys))).subscribe(
            (data) => {
              if (data.length) {
                data.map((item: any) => {
                  notification.error({
                    message: "Delete Failed",
                    description: `UID: ${item.uid} ${item.message}`,
                  });
                });
              } else {
                notification.success({
                  message: "Delete Success",
                });
              }
              closeEvent("delete");
            }
          );
        }}
        onCancel={() => setDeleteFlag(false)}
      >
        确定删除该站点?
      </EdgeModal>
      <EdgeModal
        visible={enableFlag}
        onOk={() => {
          from(request(siteApi.EnableSite(selectedRowKeys))).subscribe(
            (data) => {
              if (data.length) {
                data.map((item: any) => {
                  notification.error({
                    message: "Enable Failed",
                    description: `UID: ${item.uid} ${item.message}`,
                  });
                });
              } else {
                notification.success({
                  message: "Enable Success",
                });
              }
              closeEvent("enable");
            }
          );
        }}
        onCancel={() => setDeleteFlag(false)}
      >
        确定启用该站点?
      </EdgeModal>
      <EdgeModal
        visible={disableFlag}
        onOk={() => {
          from(request(siteApi.DisableSite(selectedRowKeys))).subscribe(
            (data) => {
              if (data.length) {
                data.map((item: any) => {
                  notification.error({
                    message: "Disable Failed",
                    description: `UID: ${item.uid} ${item.message}`,
                  });
                });
              } else {
                notification.success({
                  message: "Disable Success",
                });
              }
              closeEvent("disable");
            }
          );
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
