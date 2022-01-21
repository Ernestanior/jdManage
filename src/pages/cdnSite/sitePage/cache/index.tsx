import { FC, ReactElement, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import CacheClear from "./clearModule";
import CacheSetting from "./setModule";
import { Tabs } from "antd";

const { TabPane } = Tabs;
const Index: FC = (): ReactElement => {
  const navigator = useNavigate();
  const path: any = useLocation().state;
  const index = useMemo(() => (path && path.siteConfig) || "1", [path]);
  return (
    <Tabs
      activeKey={index}
      type="card"
      onChange={(activeKey) =>
        navigator(".", { state: { siteConfig: activeKey } })
      }
    >
      <TabPane tab="缓存设置" key="1">
        <CacheClear />
      </TabPane>
      <TabPane tab="缓存清理" key="2">
        <CacheSetting />
      </TabPane>
    </Tabs>
  );
};

export default Index;
