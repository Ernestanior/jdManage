import { Template } from "@/components/template";
import { useUserManage } from "@/store/network/userManage";
import userManage from "@/store/network/userManage/service";
import { FC, useEffect, useState } from "react";

interface props{
  props: string
}
const Index: FC<props> = (props:props ) => {
  const [params, setParams] = useState<any>();
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
   
  }, [params,props]);

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
        onClick: () => (true),
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
      // {
      //   title: "平台管理",
      //   dataIndex: "",
      //   key: "",
      // },
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
    </div>
  );
};

export default Index;
