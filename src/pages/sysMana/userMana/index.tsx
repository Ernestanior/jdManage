import { FC, ReactElement, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Admin from "./admin";
import Agency from "./agency";
import Operation from "./operation";
import Sale from "./sale";

import { Tabs } from "antd";
const { TabPane } = Tabs;
const Index: FC = (): ReactElement => {
  // const navigator = useNavigate();
  // const path: any = useLocation().state;
  // const index = useMemo(() => (path && path.siteConfig) || "1", [path]);
  return (
    <Tabs defaultActiveKey="1.1" style={{ marginBottom: 32 }}>
      <TabPane tab="管理员" key="1.1">
        <Admin />
      </TabPane>
      <TabPane tab="运维" key="1.2">
        <Agency />
      </TabPane>
      <TabPane tab="销售" key="1.3">
        <Operation />
      </TabPane>
      <TabPane tab="代理" key="1.4">
        <Sale />
      </TabPane>
    </Tabs>
  );
};

export default Index;
