import { FC, ReactElement } from "react";

import WebContent from "./content";
import WebVisit from "./visitSource";

import { Tabs } from "antd";
const { TabPane } = Tabs;

const Index: FC = (): ReactElement => {
  return (
    <Tabs defaultActiveKey="1.1" style={{ marginBottom: 32 }}>
      <TabPane tab="可用率" key="1.1">
        <WebContent type="availability" />
      </TabPane>
      <TabPane tab="响应时间" key="1.2">
        <WebContent type="responseTime" />
      </TabPane>
      <TabPane tab="访问来源地" key="1.3">
        <WebVisit />
      </TabPane>
    </Tabs>
  );
};

export default Index;
