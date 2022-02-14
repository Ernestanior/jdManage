import { FC, ReactElement, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import CdnDomainSearch from "./cdnDomainSearch";

import { Tabs } from "antd";
const { TabPane } = Tabs;
const Index: FC = (): ReactElement => {
  const navigator = useNavigate();
  const path: any = useLocation().state;
  const index = useMemo(() => (path && path.infoInquiry) || "1", [path]);
  return (
    <Tabs
      activeKey={index}
      type="card"
      onChange={(activeKey) =>
        navigator(".", { state: { infoInquiry: activeKey } })
      }
    >
      <TabPane tab="CDN站点域名查询" key="1">
        <CdnDomainSearch />
      </TabPane>
    </Tabs>
  );
};

export default Index;
