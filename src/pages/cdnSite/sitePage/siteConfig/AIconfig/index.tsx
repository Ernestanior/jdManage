import { FC, ReactElement } from "react";

import Config from "./config";
import AiLog from "./log";

import { Tabs } from "antd";
const { TabPane } = Tabs;

const Index: FC = (): ReactElement => {
  return (
    <Tabs defaultActiveKey="3.1" style={{ marginBottom: 32 }}>
      <TabPane tab="策略配置" key="3.1">
        <Config />
      </TabPane>
      <TabPane tab="调度日志" key="3.2">
        <AiLog />
      </TabPane>
    </Tabs>
  );
};

export default Index;
