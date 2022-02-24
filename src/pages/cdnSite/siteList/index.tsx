import { FC, ReactElement, useEffect, useMemo, useState } from "react";
import { Template } from "@/components/template";
import useEvent from "@/common/hooks/useEvent";
import siteService from "@/store/network/site/service";
import { useSiteList } from "@/store/network/site";
import CreateDrawer from "./createDrawer";
import EditDrawer from "./editDrawer";
import { useCustomerList } from "@/store/network/customer";
import customerService from "@/store/network/customer/service";
import { NavLink, useNavigate } from "react-router-dom";
import { EdgeModal } from "@/components/modal";
import { from } from "rxjs";
import request from "@/store/request";
import { siteApi } from "@/store/api";
import { notification } from "antd";
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
  const initdata = {
    number: 1,
    numberOfElements: 1,
    size: 10,
    totalElements: 1,
    totalPages: 1,
    sort: "",
    content: [],
  };

  const customerList = useCustomerList();
  useEffect(() => {
    if (!customerList || !customerList.content) {
      customerService.CustomerList({
        searchPage: { page: 1, pageSize: 99999 },
      });
    }
  }, [customerList]);
  const cusList = useMemo(
    () => (customerList && customerList.content) || [],
    [customerList]
  );

  const currData = useSiteList();
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
          navigator(`/cdn-site/${data.uid}`);
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
      const { customerUid, health, status, name } = params.filters;

      siteService.findSite({
        ...params.filters,
        customerUid: customerUid || "",
        health: health || "",
        status: status || "",
        name: name || "",
        searchPage: params.searchPage,
      });
    },
    batchBtns: [
      {
        text: "批量删除",
        onClick: (value: any) => {
          setDeleteFlag(true);
          setSelectedKey(value);
        },
      },
      {
        text: "批量启用",
        onClick: (value: any) => {
          setEnableFlag(true);
          setSelectedKey(value);
        },
      },
      {
        text: "批量禁用",
        onClick: (value: any) => {
          setDisableFlag(true);
          setSelectedKey(value);
        },
      },
    ],
    normalBtns: [
      {
        text: "新增站点",
        onClick: () => setCreateFlag(true),
      },
    ],
    rowId: "uid",
    data: currdata || initdata,
    config: [
      {
        title: "站点名称",
        dataIndex: "name",
        key: "name",
        render: (name: any, item: any) => (
          <NavLink to={`/cdn-site/${item.uid}`}>{name}</NavLink>
        ),
      },
      {
        title: "状态",
        dataIndex: "status",
        key: "status",
        render: (status: any) =>
          status === "enabled" ? (
            <div className={`${"status-box"} ${"status-normal"}`}>正常</div>
          ) : (
            <div className={`${"status-box"} ${"status-error"}`}>故障</div>
          ),
      },
      {
        title: "客户",
        key: "customer.name",
        render: (e: any) => {
          // console.log(e);
          return e.customer.name;
        },
      },
      {
        title: "域名数量",
        dataIndex: "domainCount",
        key: "domainCount",
      },
      {
        title: "记录数量",
        dataIndex: "recordCount",
        key: "recordCount",
      },
      {
        title: "可用性",
        dataIndex: "availability",
        key: "availability",
      },
    ],
  };
  return (
    <div style={{ padding: "20px" }}>
      <CreateDrawer
        title="新增站点"
        visible={createFlag}
        onClose={() => closeEvent("create")}
        cusList={cusList}
      />
      <EditDrawer
        title="修改站点"
        visible={editFlag}
        onClose={() => closeEvent("edit")}
        editRow={editRow}
      />
      <Template
        searchList={[
          {
            type: "select",
            text: "客戶名称",
            name: "customerUid",
            data: cusList,
          },
          { type: "input", text: "站点名称", name: "name" },
          {
            type: "select",
            text: "启用状态",
            name: "status",
            data: ["enabled", "disabled"],
          },
          {
            type: "select",
            text: "运行状态",
            name: "health",
            data: [
              { uid: "0", name: "正常" },
              { uid: "-1", name: "故障" },
            ],
          },
        ]}
        primarySearch="name"
        event$={event$}
        {...TempConfig}
      />
      <EdgeModal
        visible={deleteFlag}
        onOk={() => {
          from(request(siteApi.DeleteSite(selectedRowKeys))).subscribe(
            (data) => {
              if (data.length) {
                data.forEach((item: any) =>
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
                data.forEach((item: any) =>
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
                data.forEach((item: any) =>
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
            }
          );
        }}
        onCancel={() => setDeleteFlag(false)}
      >
        确定禁用该站点?
      </EdgeModal>
    </div>
  );
};

export default Index;
