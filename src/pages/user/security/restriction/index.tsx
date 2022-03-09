import { Button, Drawer, Form, Input, Table } from "antd";
import { FC, ReactElement, useEffect, useMemo, useState } from "react";
import "./index.less";
import IconFont from "@/components/icon";
import { PlusOutlined } from "@ant-design/icons";
import userService from "@/store/network/user/service";
import { useNewUserWhiteList } from "@/store/network/user";
import { Template } from "@/components/template";

import { userApi } from "@/store/api";
import request from "@/store/request";
interface IData {
  key: string;
  whiteIPs: string;
  action: string;
}
const Index: FC = (): ReactElement => {
  const [add, setAdd] = useState<boolean>(false);
  const whiteList = useNewUserWhiteList();
  const data = useMemo(() => {
    return whiteList?.content;
  }, [whiteList]);

  const onFinish = async (data: any) => {
    const { ips } = data;
    if (ips !== null) {
      const createWhiteList = request(userApi.UserCreateWhiteList(ips));
    }
  };

  const TempConfig = {
    optList: [
      {
        icon: (
          <IconFont
            type="icon-shanchu"
            style={{ fontSize: 18, color: "#FF8900" }}
          ></IconFont>
        ),
        event: (data: any) => {},
      },
    ],
    onSearch: (params: any) => {
      userService.UserAccessWhiteList({
        searchPage: params.searchPage,
      });
    },
    normalBtns: [
      {
        text: "新增白名单",
        onClick: () => {
          setAdd(true);
        },
      },
    ],
    rowId: "uid",
    data: data,
    config: [
      {
        title: "登录限制IP白名单",
        dataIndex: "",
        key: "",
      },
    ],
  };

  return (
    <>
      <Template closeFilter {...TempConfig}></Template>
      <Drawer
        title="Add White List"
        placement="left"
        onClose={() => setAdd(false)}
        width={400}
        visible={add}
      >
        <Form onFinish={onFinish}>
          <Form.Item name="ips">
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 20, span: 4 }}>
            <Button htmlType="submit" type="primary">
              添加
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default Index;
