import { FC, ReactElement, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import RecordMana from "./recordMana";
import DomainMana from "./domainMana";

import { Tabs } from "antd";
const { TabPane } = Tabs;
const Index: FC = (): ReactElement => {
  const navigator = useNavigate();
  const path: any = useLocation().state;
  const index = useMemo(() => (path && path.dnsMana) || "1", [path]);
  return (
    <Tabs
      activeKey={index}
      type="card"
      onChange={(activeKey) =>
        navigator(".", { state: { dnsMana: activeKey } })
      }
    >
      <TabPane tab="域名管理" key="1">
        <DomainMana />
      </TabPane>
      <TabPane tab="记录管理" key="2">
        <RecordMana />
      </TabPane>
    </Tabs>
  );
};

export default Index;
