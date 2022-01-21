import React, { FC, ReactElement } from "react";
import "./index.less";
import { Outlet } from "react-router-dom";
import { Tabs } from "antd";
import Restriction from "./restriction";
import Record from "./record";
const { TabPane } = Tabs;
const Index: FC = (): ReactElement => {
  return (
    <Tabs style={{ marginBottom: 32 }}>
      <TabPane tab="登录限制" key="1">
        <Restriction />
      </TabPane>
      <TabPane tab="登录记录" key="2">
        <Record />
      </TabPane>
    </Tabs>
  );
};

export default Index;
