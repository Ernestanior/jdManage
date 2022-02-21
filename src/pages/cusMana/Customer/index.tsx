import { Template } from "@/components/template";
import accountService from "@/store/network/account/service";
import userService from "@/store/network/user/service";
import { useUserManage } from "@/store/network/userManage";
import userManage from "@/store/network/userManage/service";
import { DownOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Drawer, Button } from "antd";
import { FC, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

interface props {
  props: string;
}
const Index: FC<props> = (props: props) => {
  const [params, setParams] = useState<any>();
  const [visible, setVisible] = useState<boolean>(false);
  const [customerUid, setCustomerUid] = useState<string>();
  const customerList = useUserManage();
  useEffect(() => {
    if (props.props === "1") {
      if (params) {
        if (params.filters === undefined) {
          userManage?.CustomerList({
            channel: "reg",
            searchPage: { desc: 1, page: 1, pageSize: 25, sort: "create_date" },
            type: "customer",
          });
        } else {
          userManage?.CustomerList({
            keyword: params.filters.keyword,
            searchPage: params.searchPage,
            type: "customer",
            status: params.filters.status,
            name: params.filters.name,
            channel: "reg",
            email: params.filters.email,
            probationFlag: params.filters.probationFlag,
          });
        }
      }
    }
  }, [params, props]);

  const handleOnclick = (key: any) => {
    setCustomerUid(key);
    // platformManage.viewSupplierAccount(key);
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
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
    onSearch: (params: any) => {
      console.log(params);

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
      {
        title: "操作",
        dataIndex: "uid",
        key: "uid",
        render: (key: any) => {
          const menu = (
            <Menu>
              <Menu.Item
                key="1"
                onClick={() => {
                  handleOnclick(key);
                  showDrawer();
                }}
              >
                登入客户账号
              </Menu.Item>
              <Menu.Item key="2">删除账户</Menu.Item>
            </Menu>
          );
          return (
            <div>
              <Dropdown overlay={menu}>
                <DownOutlined />
              </Dropdown>
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
      <Drawer
        title="查看"
        placement="left"
        onClose={onClose}
        visible={visible}
        width={570}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Button>
          <NavLink
            to={"/"}
            onClick={() => {
              userService.UserLogin({
                customerUid: customerUid,
              });
              accountService.UserInfo();
            }}
          >
            asdasd
          </NavLink>
        </Button>
      </Drawer>
    </div>
  );
};

export default Index;
