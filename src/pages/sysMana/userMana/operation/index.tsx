import { Template } from "@/components/template";
import { Role } from "@/components/template/interface";
import { useUserManage } from "@/store/network/userManage";
import userManage from "@/store/network/userManage/service";
import { FC, useEffect, useState } from "react";

const Index: FC<Role> = (props: Role) => {
  const [params, setParams] = useState<any>();
  const customerList = useUserManage();
  
  useEffect(() => {
    if (props.type === "operation") {
      if (params !== undefined) {
        if (params.filters !== undefined) {
          userManage?.CustomerList({
            keyword: params.filters.keyword,
            searchPage: params.searchPage,
            type: "operation",
            status: params.filters.status,
            name: params.filters.name,
          });
        } else {
          userManage?.CustomerList({
            type: "operation",
            searchPage: { desc: 1, page: 1, pageSize: 25, sort: "create_Date" },
          });
        }
      }
    }
   
  }, [params, props.type]);

  const config = [
    {
      title: "使用者名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
    },
  ];

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
      setParams(params);
    },
    rowId: "uid",
    data: customerList,
    config: config,
  };
  return (
    <div>
      <Template
        primarySearch={"keyword"}
        searchList={[
          {
            text: "使用者名称",
            name: "name",
            type: "input",
          },
          {
            text: "状态",
            name: "supplier",
            data: [
              { uid: 0, name: "未启用" },
              { uid: 1, name: "正常" },
            ],
            type: "select",
          },
          {
            text: "账户类型",
            name: "supplier",
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
