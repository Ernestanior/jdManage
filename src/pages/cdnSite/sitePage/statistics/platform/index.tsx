import { FC, ReactElement } from "react";

import Plat from "./content";

import { Tabs } from "antd";
const { TabPane } = Tabs;

const Index: FC = (): ReactElement => {
  return (
    <Tabs defaultActiveKey="3.1" style={{ marginBottom: 32 }}>
      <TabPane tab="可用率" key="3.1">
        <Plat type="availability" />
      </TabPane>
      <TabPane tab="响应时间" key="3.2">
        <Plat type="responseTime" />
      </TabPane>
    </Tabs>
  );
};

export default Index;
