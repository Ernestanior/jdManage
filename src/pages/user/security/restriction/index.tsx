import { Button, Drawer, Form, Input, Table } from "antd";
import React, { FC, ReactElement, useState } from "react";
import "./index.less";
import { DeleteFilled } from "@ant-design/icons";
interface IData {
  key: string;
  whiteIPs: string;
  action: string;
}
const Index: FC = (): ReactElement => {
  const [add, setAdd] = useState<boolean>(false);
  const [data, setData] = useState<IData[]>([
    {
      key: "a1",
      whiteIPs: "12.21.33.45",
      action: "",
    },
    {
      key: "a2",
      whiteIPs: "112.21.32.45",
      action: "",
    },
  ]);

  const handleDelete = (key: any) => {
    setData(data.filter((item) => item.key !== key));
  };

  const columns = [
    {
      title: "白名单IP地址",
      dataIndex: "whiteIPs",
      key: "whiteIPs",
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: { key: React.Key }) => (
        <DeleteFilled
          className="user-security-restriction-icon "
          onClick={() => handleDelete(record.key)}
        ></DeleteFilled>
      ),
    },
  ];
  const onFinish = (value: any) => {
    setData([{ key: "a3", whiteIPs: value.white, action: "" }, ...data]);
    setAdd(false);
  };
  return (
    <div className="user-security-restriction-container">
      <Button
        type="primary"
        className="user-security-btn"
        onClick={() => setAdd(true)}
      >
        添加白名单
      </Button>
      <Table dataSource={data} columns={columns} />
      <Drawer
        title="Add White List"
        placement="left"
        onClose={() => setAdd(false)}
        width={800}
        visible={add}
      >
        <Form onFinish={onFinish}>
          <Form.Item name="white">
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 20, span: 4 }}>
            <Button
              htmlType="submit"
              type="primary"
              className="user-security-btn"
            >
              添加
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default Index;
