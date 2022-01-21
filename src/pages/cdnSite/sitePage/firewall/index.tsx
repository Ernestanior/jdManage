import { FC, ReactElement, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import IPWhite from "./ipWhite";
import IPBlack from "./ipBlack";
import UAWhite from "./uaWhite";
import UABlack from "./uaBlack";

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
      <TabPane tab="IP白名单" key="1">
        <IPWhite />
      </TabPane>
      <TabPane tab="IP黑名单" key="2">
        <IPBlack />
      </TabPane>
      <TabPane tab="UA白名单" key="3">
        <UAWhite />
      </TabPane>
      <TabPane tab="UA黑名单" key="4">
        <UABlack />
      </TabPane>
    </Tabs>
  );
};

export default Index;
