import { Divider, Table } from "antd";
import React, { FC, ReactElement } from "react";
import "./index.less";
import IconFont from "@/components/icon";

const Index: FC = (): ReactElement => {
  const temporaryData = [
    {
      key: "1",
      function: "aaaa",
      menu: "2",
      cdn: "2",
      user: "1",
      time: "22",
    },
  ];
  const columns = [
    {
      title: "功能",
      dataIndex: "function",
      key: "function",
    },
    {
      title: "菜单",
      dataIndex: "menu",
      key: "menu",
    },
    {
      title: "站点/域名",
      dataIndex: "cdn",
      key: "cdn",
    },
    {
      title: "执行人",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "执行时间",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "操作",
      dataIndex: "search",
      key: "search",
      render: (_: any, record: { key: React.Key }) => (
        <div>
          <IconFont
            type="icon-search"
            className="SearchBtn"
            style={{ fontSize: 12 }}
            onClick={(_: any) => _}
          ></IconFont>
          <Divider type='vertical' />
          <IconFont
            type="icon-shanchu"
            className="DeleteBtn"
            style={{ fontSize: 17, color: "#FF8900"}}
            onClick={() => _}
          ></IconFont>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={temporaryData} />
    </div>
  );
};

export default Index;
