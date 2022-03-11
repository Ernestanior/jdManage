import { FC, ReactElement, useEffect, useMemo, useState } from "react";
import { Template } from "@/components/template";
import useEvent from "@/hooks/useEvent";
import CreateDrawer from "./createDrawer";
import EditDrawer from "./editDrawer";
import { useCustomerList } from "@/store/network/customer";
import customerService from "@/store/network/customer/service";
import { NavLink, useNavigate } from "react-router-dom";
import { EdgeModal } from "@/components/modal";
import request from "@/store/request";
import { siteApi } from "@/store/api";
import { notification } from "antd";
import { ISiteList } from "@/store/api/site";

const Index: FC = (): ReactElement => {
  const navigator = useNavigate();
  const initdata = {
    number: 1,
    numberOfElements: 1,
    size: 20,
    totalElements: 1,
    totalPages: 1,
    sort: "customer.name",
    content: [],
  };

  const customerList = useCustomerList();
  useEffect(() => {
    if (!customerList || !customerList.content) {
      customerService.findCustomer({
        searchPage: { page: 1, pageSize: 99999 },
      });
    }
  }, [customerList]);
  const cusList = useMemo(
    () => (customerList && customerList.content) || [],
    [customerList]
  );

  // const currData = useSiteList();
  // // 表格数据
  // const currdata = useMemo(() => {
  //   if (currData && currData.content) {
  //     return currData;
  //   }
  // }, [currData]);

  // 表格内选中的数据的key集合
  const [selectedRowKeys, setSelectedKey] = useState<string[]>([]);
  const [editRow, setEditRow] = useState<string>("");
  const [currData, setCurrData] = useState<ISiteList>();

  const [createFlag, setCreateFlag] = useState(false);
  const [editFlag, setEditFlag] = useState(false);
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [enableFlag, setEnableFlag] = useState(false);
  const [disableFlag, setDisableFlag] = useState(false);
  const [enableMonitorFlag, setEnableMonitorFlag] = useState(false);
  const [disableMonitorFlag, setDisableMonitorFlag] = useState(false);
  const [event$, sendMessage] = useEvent();
  const closeEvent = (
    type:
      | "Create"
      | "Edit"
      | "Disable"
      | "Delete"
      | "Enable"
      | "EnableMonitor"
      | "DisableMonitor"
  ) => {
    if (type === "Create") setCreateFlag(false);
    else if (type === "Edit") setEditFlag(false);
    else if (type === "Disable") setDisableFlag(false);
    else if (type === "Enable") setEnableFlag(false);
    else if (type === "Delete") setDeleteFlag(false);
    else if (type === "DisableMonitor") setDisableMonitorFlag(false);
    else if (type === "EnableMonitor") setEnableMonitorFlag(false);
    sendMessage("reload");
  };
  const operateSite = async (
    operate:
      | "Disable"
      | "Delete"
      | "Enable"
      | "EnableMonitor"
      | "DisableMonitor"
  ) => {
    let api;
    switch (operate) {
      case "Delete":
        api = siteApi.DeleteSite(selectedRowKeys);
        break;
      case "Disable":
        api = siteApi.DisableSite(selectedRowKeys);
        break;
      case "Enable":
        api = siteApi.EnableSite(selectedRowKeys);
        break;
      case "DisableMonitor":
        api = siteApi.DisableMonitor(selectedRowKeys);
        break;
      case "EnableMonitor":
        api = siteApi.EnableMonitor(selectedRowKeys);
        break;
      default:
        api = siteApi.DeleteSite(selectedRowKeys);
        break;
    }
    const res = await request(api, true);
    res.response === "success"
      ? notification.success({ message: `${operate} Success` })
      : res.forEach((item: any) =>
          notification.error({
            message: `${operate} Failed`,
            description: `UID: ${item.uid} ${item.message}`,
          })
        );
    closeEvent(operate);
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
      {
        text: "禁用",
        hide: (data: any) => data.status === "disabled",
        event: (data: any) => {
          setDisableFlag(true);
          setSelectedKey([data.uid]);
        },
      },
      {
        text: "启用",
        hide: (data: any) => data.status === "enabled",
        event: (data: any) => {
          setEnableFlag(true);
          setSelectedKey([data.uid]);
        },
      },
      {
        text: "暂停监控",
        hide: (data: any) => data.monitorEnabled === false,
        event: (data: any) => {
          setDisableMonitorFlag(true);
          setSelectedKey([data.uid]);
        },
      },
      {
        text: "重启监控",
        hide: (data: any) => data.monitorEnabled === true,
        event: (data: any) => {
          setEnableMonitorFlag(true);
          setSelectedKey([data.uid]);
        },
      },
    ],
    onSearch: async (params: any) => {
      const { customerUid, health, status, name, keyword } = params.filters;
      const payload = {
        ...params.filters,
        customerUid: customerUid || "",
        health: health || "",
        status: status || "",
        name: name || "",
        keyword: keyword || "",
        searchPage: params.searchPage,
      };
      const res = await request(siteApi.FindSite(payload));
      setCurrData(res);
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
    data: currData || initdata,
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
        onClose={() => closeEvent("Create")}
        cusList={cusList}
      />
      <EditDrawer
        title="修改站点"
        visible={editFlag}
        onClose={() => closeEvent("Edit")}
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
        primarySearch="keyword"
        event$={event$}
        {...TempConfig}
      />
      <EdgeModal
        visible={deleteFlag}
        onOk={() => operateSite("Delete")}
        onCancel={() => setDeleteFlag(false)}
        title="删除"
      >
        确定删除该站点?
      </EdgeModal>
      <EdgeModal
        visible={enableFlag}
        onOk={() => operateSite("Enable")}
        onCancel={() => setEnableFlag(false)}
        title="启用"
      >
        确定启用该站点?
      </EdgeModal>
      <EdgeModal
        visible={disableFlag}
        onOk={() => operateSite("Disable")}
        onCancel={() => setDisableFlag(false)}
        title="禁用"
      >
        确定禁用该站点?
      </EdgeModal>
      <EdgeModal
        visible={enableMonitorFlag}
        onOk={() => operateSite("EnableMonitor")}
        onCancel={() => setEnableMonitorFlag(false)}
        title="重启监控"
      >
        确定重启监控该站点?
      </EdgeModal>
      <EdgeModal
        visible={disableMonitorFlag}
        onOk={() => operateSite("DisableMonitor")}
        onCancel={() => setDisableMonitorFlag(false)}
        title="暂停监控"
      >
        确定暂停监控该站点?
      </EdgeModal>
    </div>
  );
};

export default Index;
