import { FC, ReactElement, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import CdnUtil from "./cdnUtil";
import StatPlatform from "./platform";
import Usage from "./usage";
import WebPerform from "./webPerform";

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
      <TabPane tab="web性能统计" key="1">
        <WebPerform />
      </TabPane>
      <TabPane tab="CDN使用率统计" key="2">
        <CdnUtil />
      </TabPane>
      <TabPane tab="平台统计" key="3">
        <StatPlatform />
      </TabPane>
      <TabPane tab="用量统计" key="4">
        <Usage />
      </TabPane>
    </Tabs>
  );
};

export default Index;
