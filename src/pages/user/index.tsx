import React, { FC, ReactElement, useEffect, useState } from "react";
import { Tabs } from "antd";

import Info from "./info";
import Log from "./log";
import ResetPwd from "./resetPwd";
import Security from "./security";
import { useLocation } from "react-router-dom";

import "./index.less";
const { TabPane } = Tabs;
const Index: FC = (): ReactElement => {
  const path: any = useLocation().state;
  const { user } = path;
  const [index, setIndex] = useState("1");
  useEffect(() => setIndex(user.toString()), [user]);

  return (
    <Tabs activeKey={index} type="card" onChange={(key) => setIndex(key)}>
      <TabPane tab="个人中心" key="1">
        <Info />
      </TabPane>
      <TabPane tab="安全" key="2">
        <Security />
      </TabPane>
      <TabPane tab="操作日志" key="3">
        <Log />
      </TabPane>
      <TabPane tab="修改密码" key="4">
        <ResetPwd />
      </TabPane>
      <TabPane tab="工单系统" key="5">
        工单系统
      </TabPane>
      <TabPane tab="计费系统" key="6">
        计费系统
      </TabPane>
    </Tabs>
  );
};

export default Index;
