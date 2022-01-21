import React, { FC, ReactElement, useEffect, useMemo, useState } from "react";
// import Create from "./create";
// import "./index.less";
import { Template } from "@/components/template";
import useEvent from "@/common/hooks/useEvent";
import siteService from "@/store/network/site/service";
import { useSiteList } from "@/store/network/site";
import CreateDrawer from "./createDrawer";
import { useCustomerList } from "@/store/network/customer";
import customerService from "@/store/network/customer/service";
import { NavLink, useNavigate } from "react-router-dom";

interface IData {
  number: number;
  size: number;
  totalPages: number;
  numberOfElements: number;
  totalElements: number;
  sort: any;
  content: any[];
}

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
    if (!customerList) {
      customerService.findCustomer({
        searchPage: { page: 1, pageSize: 99999 },
      });
    }
  }, []);

  const currData = useSiteList();
  // 表格数据
  const currdata = useMemo(() => {
    if (currData && currData.content) {
      // return {...currData,
      //   content:currData.content.map((item)=>{
      //     return {...item,customer:item.customer.name}
      //   })
      // }
      return currData;
    }
  }, [currData]);

  // 表格内选中的数据的key集合
  const [selectedRowKeys, setSelectedKey] = useState<string[]>([]);
  // const [currdata, setCurrData] = useState<IData>(currData||{
  //   number: 0,
  //   numberOfElements: 0,
  //   size: 0,
  //   totalElements: 0,
  //   totalPages: 0,
  //   sort:"",
  //   content: [],
  // });

  const [createFlag, setCreateFlag] = useState(false);
  // let token: string;
  const [event$, sendMessage] = useEvent();

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: any) => {
      setSelectedKey(selectedRowKeys);
    },
  };
  // const closeEvent = (type: "create" | "modify" | "delete" | "deleteBatch") => {
  //   if (type === "create") {
  //     setCreateFlag(false);
  //   }
  // if (type === "modify") {
  //   setModifyFlag(false);
  // }
  // if (type === "delete") {
  //   setDeleteFlag(false);
  // }
  // if (type === "deleteBatch") {
  //   setDeleteBatchFlag(false);
  // }
  //   sendMessage("reload");
  // };
  const TempConfig = {
    optList: [
      {
        text: "查看", //修改
        event: (data: any) => {
          console.log(data);
          navigator(`/cdn-site/${data.uid}`);
        },
      },
      {
        text: "删除",
        event: (data: any) => {
          console.log(data);
        },
      },
    ],
    onSearch: (params: any) => {
      console.log(params);
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
          console.log(value);
        },
      },
      {
        text: "批量启用",
        onClick: (value: any) => {
          console.log(value);
        },
      },
      {
        text: "批量禁用",
        onClick: (value: any) => {
          console.log(value);
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
      },
      {
        title: "客户",
        key: "customer.name",
        render: (e: any) => {
          // console.log(e);
          return e.name;
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
    <>
      <CreateDrawer
        title="新增站点"
        visible={createFlag}
        onClose={() => setCreateFlag(false)}
        customerList={customerList}
      />
      <Template
        searchList={[
          { type: "input", text: "客戶名称", name: "customerUid" },
          { type: "input", text: "站点名称", name: "name" },
          { type: "input", text: "启用状态", name: "status" },
          { type: "input", text: "运行状态", name: "health" },
        ]}
        primarySearch="name"
        event$={event$}
        {...TempConfig}
      />
    </>
  );
};

export default Index;
