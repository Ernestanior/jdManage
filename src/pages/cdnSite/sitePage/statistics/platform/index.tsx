import React, { FC, ReactElement } from "react";

import PlatAvail from "./availability";
import PlatResponse from "./responseTime";

import { Tabs } from "antd";
const { TabPane } = Tabs;

const Index: FC = (): ReactElement => {
  return (
    <Tabs defaultActiveKey="3.1" style={{ marginBottom: 32 }}>
      <TabPane tab="可用率" key="3.1">
        <PlatAvail />
      </TabPane>
      <TabPane tab="响应时间" key="3.2">
        <PlatResponse />
      </TabPane>
    </Tabs>
  );
};

export default Index;
