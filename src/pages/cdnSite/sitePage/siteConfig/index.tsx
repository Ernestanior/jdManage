import { FC, ReactElement, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SiteDns from "./dns";
import CdnSetting from "./cdnSetting";
import AIconfig from "./AIconfig";

import { Tabs } from "antd";

const { TabPane } = Tabs;

const Index: FC = (): ReactElement => {
  const navigator = useNavigate();
  const path: any = useLocation().state;
  const index = useMemo(() => (path && path.siteConfig) || "1", [path]);

  return (
    <Tabs
      style={{ minWidth: "1200px" }}
      activeKey={index}
      type="card"
      onChange={(activeKey) =>
        navigator(".", { state: { siteConfig: activeKey } })
      }
    >
      <TabPane tab="域名解析" key="1">
        <SiteDns />
      </TabPane>
      <TabPane tab="CDN设置" key="2">
        <CdnSetting />
      </TabPane>
      <TabPane tab="AI策略配置" key="3">
        <AIconfig />
      </TabPane>
    </Tabs>
  );
};

export default Index;
