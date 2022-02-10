import { Button, Col, Drawer, Form, Input, Table } from "antd";
import React, { FC, ReactElement, useEffect, useState } from "react";
import "./index.less";
import IconFont from "@/components/icon";
import { DeleteFilled, PlusOutlined } from "@ant-design/icons";
import userService from "@/store/network/user/service";
import { useNewUserWhiteList } from "@/store/network/user";
interface IData {
  key: string;
  whiteIPs: string;
  action: string;
}
const Index: FC = (): ReactElement => {
  // const [add, setAdd] = useState<boolean>(false);
  // const [data, setData] = useState<IData[]>([
  //   {
  //     key: "a1",
  //     whiteIPs: "12.21.33.45",
  //     action: "",
  //   },
  //   {
  //     key: "a2",
  //     whiteIPs: "112.21.32.45",
  //     action: "",
  //   },
  // ]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  useEffect(() => {
    userService.UserAccessWhiteList({
      searchPage: { desc: 1, page: page, pageSize: pageSize },
    });
  }, [page, pageSize]);
  const whiteList = useNewUserWhiteList();
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
      render: () => (
        <div>
          <IconFont
            type="icon-shanchu"
            style={{ fontSize: 17, color: "#FF8900" }}
            //onClick={() => handleDelete(record.key)}
          ></IconFont>
        </div>
      ),
    },
  ];
  const onFinish = (value: any) => {
    console.log(value);

    //setData([{ key: "a3", whiteIPs: value.white, action: "" }, ...data]);
    //setAdd(false);
  };
  return (
    <div className="restriction-Container">
      <div className="restriction-AddBtn">
        <Button type="primary"  >
          <PlusOutlined />
          新增白名单
        </Button>
      </div>

      <Table dataSource={whiteList?.content} columns={columns} />
      <Drawer
        title="Add White List"
        placement="left"
        //onClose={() => setAdd(false)}
        width={800}
        //visible={add}
      >
        <Form onFinish={onFinish}>
          <Form.Item name="white">
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 20, span: 4 }}>
            <Button htmlType="submit" type="primary">
              添加
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default Index;
