import React, { FC, ReactElement } from "react";
import { Table, Switch, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Search from "./search";
import "./index.less";
// import { NavLink } from "react-router-dom";

interface IData {
  key: string;
  record: string;
  domain: string;
  cname: string;
  status: string;
  dnsStatus: string;
  sslStatus: string;
  action: string;
}
enum Status {
  enable = "enable",
  disable = "disable",
}
const columns = [
  {
    title: "记录",
    dataIndex: "record",
  },
  {
    title: "域名",
    dataIndex: "domain",
  },
  {
    title: "CNAME",
    dataIndex: "cname",
  },
  {
    title: "状态",
    dataIndex: "status",
  },
  {
    title: "DNS 状态",
    dataIndex: "dnsStatus",
  },
  {
    title: "SSL 状态",
    dataIndex: "sslStatus",
  },
  {
    title: "操作",
    dataIndex: "action",
  },
];
let source = [
  {
    key: "a1",
    record: "p5926665.we.com",
    domain: "bbbb",
    cname: "AAAA",
    status: Status.enable,
    dnsStatus: "已指向",
    sslStatus: "on",
    action: "on",
  },
  {
    key: "a2",
    record: "p5926665.we.com",
    domain: "cccc",
    cname: "AAAA",
    status: Status.enable,
    dnsStatus: "已指向",
    sslStatus: "off",
    action: "on",
  },
  {
    key: "a3",
    record: "p5926665.we.com",
    domain: "dddd",
    cname: "AAAA",
    status: Status.enable,
    dnsStatus: "未指向",
    sslStatus: "on",
    action: "on",
  },
  {
    key: "a4",
    record: "aaa.com",
    domain: "g9999-29-g",
    cname: "AASS",
    status: Status.disable,
    dnsStatus: "未指向",
    sslStatus: "off",
    action: "off",
  },
  {
    key: "a5",
    record: "zzz.com",
    domain: "g9999-29-g",
    cname: "AVVVSS",
    status: Status.enable,
    dnsStatus: "未指向",
    sslStatus: "on",
    action: "off",
  },
  {
    key: "a6",
    record: "aaa.com",
    domain: "g9999-29-g",
    cname: "OOO",
    status: Status.disable,
    dnsStatus: "已指向",
    sslStatus: "on",
    action: "off",
  },
  {
    key: "a4",
    record: "fff.com",
    domain: "g9999-29-g",
    cname: "A",
    status: Status.disable,
    dnsStatus: "已指向",
    sslStatus: "off",
    action: "off",
  },
];

const Index: FC = (): ReactElement => {
  // 选中数据的key集合列表
  const [selectedRowKeys, setSelectedKey] = React.useState<string[]>([]);
  // 数据保存
  const [data, setData] = React.useState<IData[]>(source);
  // let token: string;
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: any) => {
      setSelectedKey(selectedRowKeys);
    },
  };
  // React.useEffect(() => {
  //   // 订阅record筛选条件
  //   PubSub.subscribe("RecordSearch", (_: any, condition: any) => {
  //     if (condition) {
  //       let newSource: IData[] = source;
  //       for (let i in condition) {
  //         if (condition[i]) {
  //           newSource = newSource.filter(
  //             (item: any) => item[i].indexOf(condition[i]) !== -1
  //           );
  //         }
  //       }
  //       setData(newSource);
  //     }
  //   });
  // }, []);
  // 美化渲染数据
  const newlist = data.map((item: IData) => {
    return {
      key: item.key,
      record: item.record,
      domain: item.domain,
      cname: item.cname,
      status: (
        <span
          className={`site-list-status ${
            item.status === "enable" ? "well" : "error"
          }`}
        >
          {item.status}
        </span>
      ),
      dnsStatus: item.dnsStatus,
      sslStatus: item.sslStatus,
      action: (
        <Switch
          className="site-list-switch"
          checkedChildren="开启"
          unCheckedChildren="关闭"
          defaultChecked={item.action === "on" ? true : false}
        />
      ),
    };
  });
  // console.log(newlist);
  return (
    <>
      <Search></Search>
      <div className="site-list-container">
        <Button type="primary" className="site-list-button">
          <PlusOutlined />
          新增记录
        </Button>
        <Button
          type="primary"
          disabled={selectedRowKeys.length === 0 ? true : false}
          className="site-list-button"
        >
          刷新DNS
        </Button>
        <Button
          type="primary"
          disabled={selectedRowKeys.length === 0 ? true : false}
          className="site-list-button"
        >
          删除记录
        </Button>
        <Button
          type="primary"
          disabled={selectedRowKeys.length === 0 ? true : false}
          className="site-list-button"
        >
          启动SSL
        </Button>{" "}
        <Button
          type="primary"
          disabled={selectedRowKeys.length === 0 ? true : false}
          className="site-list-button"
        >
          关闭SSL
        </Button>{" "}
        <Button
          type="primary"
          disabled={selectedRowKeys.length === 0 ? true : false}
          className="site-list-button"
        >
          申请SSL
        </Button>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={newlist}
          pagination={{ pageSize: 6 }}
        ></Table>
      </div>
    </>
  );
};

export default Index;
