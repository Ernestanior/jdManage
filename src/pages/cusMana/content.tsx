import { Btn } from "@/components/button";
import IconFont from "@/components/icon";
import { Template } from "@/components/template";
import accountService from "@/store/network/account/service";
import userService from "@/store/network/user/service";
import { useUserManage } from "@/store/network/userManage";
import userManage from "@/store/network/userManage/service";
import { DownOutlined } from "@ant-design/icons";
import { Button, notification } from "antd";
import { FC, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import LoginDrawer from "./loginDrawer";
import CreateDrawer from "./createDrawer";
import EditDrawer from "./editDrawer";
import StatDrawer from "./statDrawer";
import InterDataDrawer from "./interDataDrawer";
import { useLoading } from "@/components/loading";
import { from } from "rxjs";
import request from "@/store/request";
import { customerApi } from "@/store/api";
import { EdgeModal } from "@/components/modal";
// interface IProps {
//   type: "reg" | "sales";
// }
const Index: FC = () => {
  const [params, setParams] = useState<any>();

  const [loginFlag, setLoginFlag] = useState<boolean>(false);
  const [createFlag, setCreateFlag] = useState<boolean>(false);
  const [editFlag, setEditFlag] = useState<boolean>(false);
  const [deleteFlag, setDeleteFlag] = useState<boolean>(false);
  const [enableFlag, setEnableFlag] = useState<boolean>(false);
  const [disableFlag, setDisableFlag] = useState<boolean>(false);
  const [statFlag, setStatFlag] = useState<boolean>(false);
  const [interDataFlag, setInterDataFlag] = useState<boolean>(false);
  const [convertFlag, setConvertFlag] = useState<boolean>(false);

  // const [convertType, setConvertType] = useState<string>("");
  const [selected, setSelected] = useState<string[]>([]);
  const [editData, setEditData] = useState<any>({});
  const [customerUid, setCustomerUid] = useState<string>();
  const [supSupplier, setSupSupplier] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  // const [loading$,setLoading] = useState<boolean>(false)
  const customerList = useUserManage();
  const loading = useLoading();
  const routerState: any = useLocation().state;
  const type = useMemo(() => routerState && routerState.cusMana, [routerState]);
  const deleteCustomer = (data: string[]) => {
    from(request(customerApi.DeleteCustomer(data))).subscribe((data) => {
      data instanceof Object
        ? notification.success({ message: "Delete Success" })
        : notification.error({ message: "Delete failed", description: data });
      setRefresh(!refresh);
      setDeleteFlag(false);
      setSelected([]);
    });
  };
  const disableCustomer = (data: string[]) => {
    from(request(customerApi.DisableCustomer(data))).subscribe((data) => {
      data instanceof Object
        ? notification.success({ message: "Disable Success" })
        : notification.error({ message: "Disable failed", description: data });
      setRefresh(!refresh);
      setDisableFlag(false);
      setSelected([]);
    });
  };
  const enableCustomer = (data: string[]) => {
    from(request(customerApi.EnableCustomer(data))).subscribe((data) => {
      data instanceof Object
        ? notification.success({ message: "Enable Success" })
        : notification.error({ message: "Enable failed", description: data });
      setRefresh(!refresh);
      setEnableFlag(false);
      setSelected([]);
    });
  };
  const ChannelUpdate = () => {
    customerUid &&
      from(
        request(
          customerApi.ChannelUpdate(
            type === "reg" ? "sales" : "reg",
            customerUid
          )
        )
      ).subscribe((data) => {
        setConvertFlag(false);
        setRefresh(!refresh);
        if (data instanceof Object) {
          notification.success({ message: "Update Success" });
        }
      });
  };
  useEffect(() => {
    params &&
      userManage.CustomerList({
        keyword: params.filters.keyword || "",
        searchPage: params.searchPage,
        type: "customer",
        status: params.filters.status || "",
        name: params.filters.name || "",
        channel: type || "reg",
        email: params.filters.email || "",
        probationFlag: params.filters.probationFlag || "",
      });
  }, [params, type, refresh]);

  const TempConfig = {
    batchBtns: [
      {
        text: "批量删除",
        onClick: (value: any) => {
          setDeleteFlag(true);
          setSelected(value);
        },
      },
      {
        text: "批量启用",
        onClick: (value: any) => {
          setEnableFlag(true);
          setSelected(value);
        },
      },
      {
        text: "批量禁用",
        onClick: (value: any) => {
          setDisableFlag(true);
          setSelected(value);
        },
      },
    ],
    normalBtns: [
      {
        text: "新增客户",
        onClick: () => setCreateFlag(true),
        loading: loading,
      },
    ],
    optList: [
      {
        text: "登入客户账号",
        event: (data: any) => {
          setCustomerUid(data.uid);
          setLoginFlag(true);
        },
      },
      {
        text: "数据统计",
        event: (data: any) => {
          setSupSupplier(!!data.supportsSupplier);
          setCustomerUid(data.uid);
          setStatFlag(true);
        },
      },
      {
        text: `转换为${type === "sales" ? "注册" : "销售"}客户`,
        event: (data: any) => {
          setCustomerUid(data.uid);
          setConvertFlag(true);
        },
      },
      {
        text: "内部数据",
        event: (data: any) => {
          setCustomerUid(data.uid);
          setInterDataFlag(true);
        },
      },
      {
        text: "编辑",
        event: (data: any) => {
          setEditData(data);
          setEditFlag(true);
        },
      },
      {
        text: "删除账户",
        event: (data: string[]) => {
          setSelected(data);
          setDeleteFlag(true);
        },
      },
    ],
    onSearch: (params: any) => {
      setParams(params);
    },
    rowId: "uid",
    data: customerList,
    config: [
      {
        title: "客户名称",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "登入电邮",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "状态",
        dataIndex: "status",
        key: "status",
        render: (status: any) =>
          status === 1 ? (
            <div className={`${"status-box"} ${"status-normal"}`}>正常</div>
          ) : (
            <div className={`${"status-box"} ${"status-error"}`}>故障</div>
          ),
      },
      {
        title: "账户类型",
        dataIndex: "probationFlag",
        key: "probationFlag",
        render: (key: any) => {
          return <div>{key > 0 ? ` 试用` : `正式`}</div>;
        },
      },
      {
        title: "使用者类型",
        dataIndex: "supportsSupplier",
        key: "supportsSupplier",
        render: (key: any) => {
          return key ? (
            <div className="mini-box-blue">企业版</div>
          ) : (
            <div className="mini-box-yellow">个人版</div>
          );
        },
      },
      {
        title: "已登入",
        dataIndex: "hasLoggedIn",
        key: "hasLoggedIn",
        render: (key: any) => {
          return (
            <div>
              {key ? (
                <IconFont type="icon-check-green" />
              ) : (
                <IconFont type="icon-fail" />
              )}
            </div>
          );
        },
      },
    ],
  };
  return (
    <div>
      <Template
        primarySearch={"keyword"}
        searchList={[
          {
            text: "客户名称",
            name: "name",
            type: "input",
          },
          {
            text: "登入电邮",
            name: "email",
            type: "input",
          },
          {
            text: "状态",
            name: "status",
            data: [
              { uid: 0, name: "未启用" },
              { uid: 1, name: "正常" },
            ],
            type: "select",
          },
          {
            text: "账户类型",
            name: "probationFlag",
            data: [
              { uid: 0, name: "正式" },
              { uid: 1, name: "试用" },
            ],
            type: "select",
          },
        ]}
        {...TempConfig}
      ></Template>
      {customerUid && (
        <>
          <LoginDrawer
            onClose={() => setLoginFlag(false)}
            visible={loginFlag}
            customerUid={customerUid}
          ></LoginDrawer>
          <StatDrawer
            onClose={() => setStatFlag(false)}
            visible={statFlag}
            customerUid={customerUid}
            supSupplier={supSupplier}
          ></StatDrawer>
          <InterDataDrawer
            onClose={() => setInterDataFlag(false)}
            visible={interDataFlag}
            customerUid={customerUid}
          ></InterDataDrawer>
        </>
      )}
      <CreateDrawer
        onClose={() => setCreateFlag(false)}
        reload={() => setRefresh(!refresh)}
        visible={createFlag}
        loading={loading}
      ></CreateDrawer>
      <EditDrawer
        onClose={() => setEditFlag(false)}
        reload={() => setRefresh(!refresh)}
        data={editData}
        visible={editFlag}
        loading={loading}
      ></EditDrawer>
      <EdgeModal
        visible={deleteFlag}
        onCancel={() => setDeleteFlag(false)}
        onOk={() => deleteCustomer(selected)}
        title="删除"
        loading={loading}
      >
        你确定删除此账户？
      </EdgeModal>
      <EdgeModal
        visible={enableFlag}
        onCancel={() => setEnableFlag(false)}
        onOk={() => {
          enableCustomer(selected);
        }}
        title="启用"
        loading={loading}
      >
        你确定启用此账户？
      </EdgeModal>
      <EdgeModal
        visible={disableFlag}
        onCancel={() => setDisableFlag(false)}
        onOk={() => {
          disableCustomer(selected);
        }}
        title="禁用"
        loading={loading}
      >
        你确定禁用此账户？
      </EdgeModal>
      <EdgeModal
        visible={convertFlag}
        onCancel={() => setConvertFlag(false)}
        onOk={ChannelUpdate}
        title="转换客户"
        loading={loading}
      >
        你确定要转换为{type === "sales" ? "注册" : "销售"}客户？
      </EdgeModal>
    </div>
  );
};

export default Index;
