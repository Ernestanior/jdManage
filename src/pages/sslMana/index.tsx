import { FC, ReactElement, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Client from "./client";
import Origin from "./origin";
import Download from "./origin";

import { Tabs } from "antd";
const { TabPane } = Tabs;
const Index: FC = (): ReactElement => {
  const navigator = useNavigate();
  const path: any = useLocation().state;
  const index = useMemo(() => (path && path.sslMana) || "1", [path]);
  return (
    <Tabs
      activeKey={index}
      type="card"
      onChange={(activeKey) =>
        navigator(".", { state: { sslMana: activeKey } })
      }
    >
      <TabPane tab="客户端证书" key="1">
        <Client />
      </TabPane>
      <TabPane tab="源证书" key="2">
        <Origin />
      </TabPane>
      <TabPane tab="证书下载" key="3">
        <Download />
      </TabPane>
    </Tabs>
  );
};

export default Index;
