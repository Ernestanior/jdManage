import { FC, ReactElement, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Registered from "./registered";
import Sale from "./sale";

import { Tabs } from "antd";
const { TabPane } = Tabs;
const Index: FC = (): ReactElement => {
  const navigator = useNavigate();
  const path: any = useLocation().state;
  const index = useMemo(() => (path && path.cusMana) || "1", [path]);
  return (
    <Tabs
      activeKey={index}
      type="card"
      onChange={(activeKey) =>
        navigator(".", { state: { cusMana: activeKey } })
      }
    >
      <TabPane tab="注册客户" key="1">
        <Registered />
      </TabPane>
      <TabPane tab="用户管理" key="2">
        <Sale />
      </TabPane>
    </Tabs>
  );
};

export default Index;
