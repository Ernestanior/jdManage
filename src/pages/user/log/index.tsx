import React, { FC, ReactElement, useMemo, useState } from "react";
import "./index.less";
import { Tabs } from "antd";
import Content from "./content";
import { useLocation, useNavigate } from "react-router-dom";

const { TabPane } = Tabs;
const Index: FC = (): ReactElement => {
  const navigator = useNavigate();
  const path: any = useLocation().state;
  const index = useMemo(() => (path && path.userLog) || "admin", [path]);

  console.log(index);

  return (
    <Tabs
      destroyInactiveTabPane
      activeKey={index}
      onChange={(activeKey) =>
        navigator(".", { state: { ...path, userLog: activeKey } })
      }
    >
      <TabPane tab="管理员操作日志" key="admin">
        <Content />
      </TabPane>
      <TabPane tab="客户操作日志" key="customer">
        <Content />
      </TabPane>
    </Tabs>
  );
};

export default Index;
