import { Btn } from "@/components/button";
import IconFont from "@/components/icon";
import { Template } from "@/components/template";
import accountService from "@/store/network/account/service";
import userService from "@/store/network/user/service";
import { useUserManage } from "@/store/network/userManage";
import userManage from "@/store/network/userManage/service";
import { DownOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { FC, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import LoginDrawer from "./loginDrawer";
// interface IProps {
//   type: "reg" | "sales";
// }
const Index: FC = () => {
  const [params, setParams] = useState<any>();
  const [visible, setVisible] = useState<boolean>(false);
  const [customerUid, setCustomerUid] = useState<string>();
  const customerList = useUserManage();
  const routerState: any = useLocation().state;
  const type = useMemo(() => routerState && routerState.cusMana, [routerState]);
  useEffect(() => {
    params &&
      userManage.CustomerList({
        keyword: params.filters.keyword || "",
        searchPage: params.searchPage,
        type: "customer",
        status: params.filters.status || "",
        name: params.filters.name || "",
        channel: type,
        email: params.filters.email || "",
        probationFlag: params.filters.probationFlag || "",
      });
  }, [params, type]);

  const onClose = () => {
    // setSupplierAccount({});
  };

  const TempConfig = {
    batchBtns: [
      {
        text: "批量删除",
        onClick: (value: any) => {
          // setDeleteFlag(true);
          // setSelectedKey(value);
        },
      },
      {
        text: "批量启用",
        onClick: (value: any) => {
          // setEnableFlag(true);
          // setSelectedKey(value);
        },
      },
      {
        text: "批量禁用",
        onClick: (value: any) => {
          // setDisableFlag(true);
          // setSelectedKey(value);
        },
      },
    ],
    normalBtns: [
      {
        text: "新增站点",
        onClick: () => true,
      },
    ],
    optList: [
      {
        text: "登入客户账号",
        event: (data: any) => {
          setCustomerUid(data.uid);
          setVisible(true);
        },
      },
      {
        text: "编辑",
        event: (data: any) => {},
      },
      {
        text: "删除账户",
        event: (data: any) => {
          console.log(data);
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
          return <div>{key ? `企业版` : `个人版`}</div>;
        },
      },
      {
        title: "已登入",
        dataIndex: "hasLoggedIn",
        key: "hasLoggedIn",
        render: (key: any) => {
          return <div>{key ? `` : `X`}</div>;
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
        <LoginDrawer
          onClose={() => setVisible(false)}
          visible={visible}
          customerUid={customerUid}
        ></LoginDrawer>
      )}
    </div>
  );
};

export default Index;
