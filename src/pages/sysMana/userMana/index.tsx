import { FC, ReactElement, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Content from "./content";
import { Tabs } from "antd";
const { TabPane } = Tabs;
const Index: FC = (): ReactElement => {
  const navigator = useNavigate();
  const path: any = useLocation().state;
  const index = useMemo(() => (path && path.userMana) || "admin", [path]);

  return (
    <Tabs
      style={{ marginBottom: 32 }}
      activeKey={index}
      onChange={(activeKey: string) =>
        navigator(".", { state: { userMana: activeKey } })
      }
      destroyInactiveTabPane
    >
      <TabPane tab="管理员" key="admin">
        <Content />
      </TabPane>
      <TabPane tab="运维" key="operation">
        <Content />
      </TabPane>
      <TabPane tab="销售" key="sales">
        <Content />
      </TabPane>
      <TabPane tab="代理" key="agent">
        <Content />
      </TabPane>
    </Tabs>
  );
};

export default Index;
