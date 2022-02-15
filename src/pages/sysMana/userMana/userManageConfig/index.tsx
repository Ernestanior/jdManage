import { Template } from "@/components/template";
import { IRenderConfig } from "@/components/template/fastRender";
import { Role } from "@/components/template/interface";
import { useUserManage } from "@/store/network/userManage";
import userManage from "@/store/network/userManage/service";
import React, { FC, ReactElement, useEffect, useState } from "react";


const Index: FC<Role> = (props: Role) => {
  const [params, setParams] = useState<any>();
  const [config, setConfig] = useState<any>();
  const [option, setOption] = useState<any>();
  const customerList = useUserManage();
  useEffect(() => {
    if (params !== undefined) {
      userManage?.CustomerList({
        keyword: params.filters.keyword,
        searchPage: params.searchPage,
        type: props.type,
        status: params.filters.status,
        name: params.filters.name,
      });
    } else {
      userManage?.CustomerList({
        type: props.type,
        searchPage: { desc: 1, page: 1, pageSize: 25, sort: "create_Date" },
      });
    }
  }, [params, props.type]);

  useEffect(() => {
    console.log(props.type);

    if (props.group === 1) {
      setConfig(config1);
      setOption(option1);
    } else {
      setConfig(config2);
      setOption(option2);
    }
  }, [props.type]);
  let config1 = [
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
  let config2 = [
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
    {
      title: "账户类型",
      //??
      dataIndex: "probationFlag",
      key: "probationFlag",
    },
  ];
  let option1 = [
    {
      text: "使用者名称",
      name: "name",
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
  ];

  let option2 = [
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
        onClick: () => (true),
      },
    ],
    onSearch: (params: any) => {
      setParams(params);
    },
    rowId: "uid",
    data: customerList,
    config: config ? config : [],
  };
  return (
    <div>
      <Template
        primarySearch={"keyword"}
        searchList={option}
        {...TempConfig}
      ></Template>
    </div>
  );
};

export default Index;
