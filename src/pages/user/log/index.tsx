import React, { FC, ReactElement } from "react";
import "./index.less";
import { Tabs } from "antd";
import Admin from "./admin";
import Customer from "./customer";
const { TabPane } = Tabs;
const Index: FC = (): ReactElement => {
  return (
    <Tabs defaultActiveKey="1" style={{ marginBottom: 32 }}>
      <TabPane tab="管理员操作日志" key="1">
        <Admin />
      </TabPane>
      <TabPane tab="客户操作日志" key="2">
        <Customer />
      </TabPane>
    </Tabs>
  );
};

export default Index;
