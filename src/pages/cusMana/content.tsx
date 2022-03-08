import IconFont from "@/components/icon";
import { Template } from "@/components/template";
import { notification } from "antd";
import { FC, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import LoginDrawer from "./loginDrawer";
import CreateDrawer from "./createDrawer";
import EditDrawer from "./editDrawer";
import StatDrawer from "./statDrawer";
import InterDataDrawer from "./interDataDrawer";
import { useLoading } from "@/components/loading";
import request from "@/store/request";
import { customerApi } from "@/store/api";
import { EdgeModal } from "@/components/modal";
import {
  ICustomerList,
  IDefenceQuota,
  IServiceDomain,
} from "@/store/network/customer/interface";
import useEvent from "@/hooks/useEvent";
import { from } from "rxjs";

const Index: FC = () => {
  const [loginFlag, setLoginFlag] = useState<boolean>(false);
  const [createFlag, setCreateFlag] = useState<boolean>(false);
  const [editFlag, setEditFlag] = useState<boolean>(false);
  const [deleteFlag, setDeleteFlag] = useState<boolean>(false);
  const [enableFlag, setEnableFlag] = useState<boolean>(false);
  const [disableFlag, setDisableFlag] = useState<boolean>(false);
  const [statFlag, setStatFlag] = useState<boolean>(false);
  const [interDataFlag, setInterDataFlag] = useState<boolean>(false);
  const [convertFlag, setConvertFlag] = useState<boolean>(false);
  const [resetPwdFlag, setPwdFlag] = useState<boolean>(false);

  const [selected, setSelected] = useState<string[]>([]);
  const [editData, setEditData] = useState<any>({});
  const [customerUid, setCustomerUid] = useState<string>();
  const [supSupplier, setSupSupplier] = useState<boolean>(false);
  const [customerList, setCustomerList] = useState<ICustomerList>();
  const [defenceQuota, setDefenceQuota] = useState<IDefenceQuota[]>([]);
  const [serviceDomain, setServiceDomain] = useState<IServiceDomain[]>([]);
  const loading = useLoading();
  const [event$, sendMessage] = useEvent();

  const routerState: any = useLocation().state;

  useEffect(() => {
    const obs1 = from(request(customerApi.FindDefenceQuota())).subscribe(
      (data) => {
        data && data.options && setDefenceQuota(data.options);
      }
    );
    const obs2 = from(request(customerApi.FindServiceDomain())).subscribe(
      (data) => {
        data && data.content && setServiceDomain(data.content);
      }
    );
    return () => {
      obs1.unsubscribe();
      obs2.unsubscribe();
    };
  }, []);

  const type = useMemo(() => routerState && routerState.cusMana, [routerState]);
  const deleteCustomer = async (data: string[]) => {
    const res = await request(customerApi.DeleteCustomer(data));
    res instanceof Array
      ? notification.error({ message: "Delete failed", description: data })
      : notification.success({ message: "Delete Success" });
    sendMessage("reload");
    setDeleteFlag(false);
    setSelected([]);
  };
  const disableCustomer = async (data: string[]) => {
    const res = await request(customerApi.DisableCustomer(data));
    res instanceof Array
      ? notification.error({ message: "Disable failed", description: data })
      : notification.success({ message: "Disable Success" });
    sendMessage("reload");
    setDisableFlag(false);
    setSelected([]);
  };
  const enableCustomer = async (data: string[]) => {
    const res = await request(customerApi.EnableCustomer(data));
    res instanceof Array
      ? notification.error({ message: "Enable failed", description: data })
      : notification.success({ message: "Enable Success" });
    sendMessage("reload");
    setEnableFlag(false);
    setSelected([]);
  };
  const ChannelUpdate = async () => {
    if (customerUid) {
      const res = await request(
        customerApi.ChannelUpdate(type === "reg" ? "sales" : "reg", customerUid)
      );
      setConvertFlag(false);
      sendMessage("reload");
      res instanceof Array
        ? notification.error({ message: "Update failed", description: res })
        : notification.success({ message: "Update Success" });
    }
  };
  const resetPwd = async () => {
    if (customerUid) {
      const res = await request(customerApi.ResetPassword(customerUid));
      res instanceof Array
        ? notification.error({
            message: "Reset Password failed",
            description: res,
          })
        : notification.success({
            message: "Reset Password Success",
            description: res.password,
            duration: null,
          });
      sendMessage("reload");
      setPwdFlag(false);
      setSelected([]);
    }
  };

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
        text: "重置密码",
        event: (data: any) => {
          setCustomerUid(data.uid);
          setPwdFlag(true);
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
        text: "删除",
        event: (data: any) => {
          setSelected([data.uid]);
          setDeleteFlag(true);
        },
      },
    ],
    onSearch: async (params: any) => {
      const payload = {
        keyword: params.filters.keyword || "",
        searchPage: params.searchPage,
        type: "customer",
        status: params.filters.status,
        name: params.filters.name || "",
        channel: type || "reg",
        email: params.filters.email || "",
        probationFlag: params.filters.probationFlag,
      };
      const res = await request(customerApi.FindCustomer(payload));
      setCustomerList(res);
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
        event$={event$}
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
        reload={() => sendMessage("reload")}
        visible={createFlag}
        loading={loading}
        defenceQuota={defenceQuota}
        serviceDomain={serviceDomain}
      ></CreateDrawer>
      <EditDrawer
        onClose={() => setEditFlag(false)}
        reload={() => sendMessage("reload")}
        data={editData}
        visible={editFlag}
        loading={loading}
        defenceQuota={defenceQuota}
        serviceDomain={serviceDomain}
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
      <EdgeModal
        visible={resetPwdFlag}
        onCancel={() => setPwdFlag(false)}
        onOk={resetPwd}
        title="禁用"
        loading={loading}
      >
        你确定为此账户重置密码？
      </EdgeModal>
    </div>
  );
};

export default Index;
